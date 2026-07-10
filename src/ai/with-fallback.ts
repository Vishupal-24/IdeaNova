import { ai } from '@/ai/genkit';
import type { ExecutablePrompt, GenerateResponse, MessageData } from 'genkit';
import type { z } from 'genkit';
import { llama33x70bVersatile } from 'genkitx-groq';

// If Gemini hasn't responded within this window, we stop waiting on it and
// retry the same prompt against Groq instead. This is intentionally shorter
// than the 60s client-side AI_REQUEST_TIMEOUT_MS — that outer timeout is the
// last resort; this one is what actually triggers the hybrid switch.
const PRIMARY_TIMEOUT_MS = 12000;

// Llama models (via Groq) can still wrap output in a markdown code fence in
// edge cases even with JSON mode requested. Strip a fence if present.
function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return (fenced ? fenced[1] : text).trim();
}

type ZodSchemaLike = {
  _def?: { typeName?: string; type?: ZodSchemaLike; values?: string[] };
  shape?: Record<string, unknown>;
  description?: string;
};

// Describes an object schema's fields, recursively, in plain English — a
// lightweight, dependency-free alternative to a full zod-to-json-schema
// conversion. Depth is capped since our schemas never nest deeper than this.
function describeObjectFields(objectSchema: unknown, indent: string, depth: number): string {
  const shape = (objectSchema as ZodSchemaLike)?.shape;
  if (!shape) return `${indent}(unknown fields)`;
  return Object.entries(shape)
    .map(([key, fieldSchema]) => `${indent}- "${key}": ${describeFieldType(fieldSchema, indent, depth)}`)
    .join('\n');
}

function describeFieldType(fieldSchema: unknown, indent = '', depth = 0): string {
  const def = (fieldSchema as ZodSchemaLike)?._def;
  const typeName = def?.typeName;
  let typeHint = 'value';
  const nextIndent = indent + '  ';

  switch (typeName) {
    case 'ZodString':
      typeHint = 'string';
      break;
    case 'ZodNumber':
      typeHint = 'number';
      break;
    case 'ZodBoolean':
      typeHint = 'boolean';
      break;
    case 'ZodEnum':
      typeHint = def?.values ? `one of: ${def.values.map((v) => `"${v}"`).join(', ')}` : 'string';
      break;
    case 'ZodArray': {
      const element = def?.type;
      const elementTypeName = element?._def?.typeName;
      if (elementTypeName === 'ZodObject' && depth < 3) {
        typeHint = `array of objects, each with fields:\n${describeObjectFields(element, nextIndent, depth + 1)}`;
      } else if (elementTypeName === 'ZodString') {
        typeHint = 'array of strings';
      } else {
        typeHint = 'array';
      }
      break;
    }
    case 'ZodObject':
      typeHint = depth < 3 ? `object with fields:\n${describeObjectFields(fieldSchema, nextIndent, depth + 1)}` : 'object';
      break;
    default:
      break;
  }
  const description = (fieldSchema as ZodSchemaLike)?.description;
  return description ? `${typeHint} — ${description}` : typeHint;
}

// Genkit resolves Gemini's structured output via a native, schema-constrained
// API mode — no textual instructions are needed, so the rendered prompt text
// alone (as returned by `prompt.render()`) says nothing about producing JSON
// at all. Groq/Llama has no equivalent, so without an explicit instruction it
// just answers in plain prose. This builds that instruction directly from the
// schema's own field names, types (recursively, for nested objects/arrays),
// and `.describe()` text. It also must literally contain the word "json" —
// Groq's API rejects `response_format: json_object` requests otherwise.
function buildJsonInstruction(outputSchema: z.ZodTypeAny): string {
  const shape = (outputSchema as unknown as ZodSchemaLike).shape;
  if (!shape) {
    return '\n\nRespond with ONLY a single valid JSON object. Do not include markdown code fences, backticks, or any explanatory text outside the JSON object.';
  }
  const fieldLines = describeObjectFields(outputSchema, '', 0);
  return `\n\nRespond with ONLY a single valid JSON object matching exactly this shape (no extra fields, no markdown code fences, no explanatory text outside the JSON object):\n${fieldLines}`;
}

// `prompt.render()` returns `{ messages, output }` for real definePrompt()
// prompts — never a top-level `prompt` field. This appends the JSON
// instruction as an extra text part on the final message (creating one if
// the render produced none), rather than assuming a `prompt` string exists.
function appendInstructionToMessages(messages: MessageData[] | undefined, instruction: string): MessageData[] {
  const list = messages ?? [];
  if (list.length === 0) {
    return [{ role: 'user', content: [{ text: instruction }] }];
  }
  const last = list[list.length - 1];
  return [...list.slice(0, -1), { ...last, content: [...last.content, { text: instruction }] }];
}

/**
 * Runs a Genkit prompt against Gemini first. If Gemini is too slow (high
 * demand) or errors, re-renders the exact same prompt — same template, same
 * instructions — and sends it to Groq's Llama 3.3 70B model instead.
 *
 * The Groq call requests `output: {format: 'json'}`, which genkitx-groq turns
 * into a real `response_format: json_object` constraint on Groq's API
 * (guaranteeing valid JSON syntax back), paired with an explicit field-by-
 * field instruction built from the schema so the model uses the right field
 * names and types — response_format alone only guarantees valid JSON syntax,
 * not that it matches our particular shape.
 */
export async function generateWithFallback<I, O extends z.ZodTypeAny>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- only `model`/`config` are ever overridden here, never the provider-specific CustomOptions type
  prompt: ExecutablePrompt<I, O, any>,
  input: I,
  outputSchema: O
): Promise<{ output: z.infer<O> }> {
  try {
    const response = await new Promise<GenerateResponse<z.infer<O>>>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Gemini did not respond in time')), PRIMARY_TIMEOUT_MS);
      prompt(input).then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        }
      );
    });
    return { output: response.output as z.infer<O> };
  } catch (error) {
    console.warn(
      '[AI fallback] Gemini timed out or failed, retrying with Groq:',
      error instanceof Error ? error.message : error
    );

    const rendered = await prompt.render(input);
    const messagesWithJsonInstruction = appendInstructionToMessages(
      rendered.messages,
      buildJsonInstruction(outputSchema)
    );

    const groqResponse = await ai.generate({
      ...rendered,
      messages: messagesWithJsonInstruction,
      model: llama33x70bVersatile,
      config: undefined,
      output: { format: 'json' },
    });

    // In JSON mode, genkitx-groq parses the model's JSON itself and exposes
    // it via `.output`, leaving `.text` empty. Fall back to parsing `.text`
    // defensively in case that's ever not the case.
    const raw = groqResponse.output ?? JSON.parse(extractJson(groqResponse.text));
    return { output: outputSchema.parse(raw) };
  }
}

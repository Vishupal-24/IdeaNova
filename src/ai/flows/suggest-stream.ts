
'use server';

/**
 * @fileOverview A flow to suggest an academic stream based on student's interests and personality.
 *
 * - suggestStream - A function that handles the stream suggestion process.
 * - SuggestStreamInput - The input type for the suggestStream function.
 * - SuggestStreamOutput - The return type for the suggestStream function.
 */

import {ai} from '@/ai/genkit';
import type { SuggestStreamInput, SuggestStreamOutput } from '@/ai/schemas';
import { SuggestStreamInputSchema, SuggestStreamOutputSchema } from '@/ai/schemas';

export async function suggestStream(input: SuggestStreamInput): Promise<SuggestStreamOutput> {
  return suggestStreamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStreamPrompt',
  input: {schema: SuggestStreamInputSchema},
  output: {schema: SuggestStreamOutputSchema},
  prompt: `You are an expert career counselor for engineering students in India. Your task is to recommend an engineering specialization (e.g., Computer Science, Mechanical, Civil, Electrical) based on the student's interests and personality traits.

Student's Interests:
{{#each interests}}
- {{{this}}}
{{/each}}

Student's Personality:
{{#each personality}}
- {{{this}}}
{{/each}}

Based on this information, provide the following:
1.  **recommendedStream**: The most suitable engineering branch.
2.  **reasoning**: A clear and encouraging explanation for your recommendation. Connect their interests and personality traits directly to the nature of the subjects and opportunities in the recommended stream. For example, if they are creative and like building things, explain how Mechanical Engineering is a good fit.
3.  **careerPathways**: List 3-4 diverse and relevant career pathways that open up with the recommended stream. Include a mix of traditional and modern engineering careers suitable for the Indian context.
`,
});

const suggestStreamFlow = ai.defineFlow(
  {
    name: 'suggestStreamFlow',
    inputSchema: SuggestStreamInputSchema,
    outputSchema: SuggestStreamOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);

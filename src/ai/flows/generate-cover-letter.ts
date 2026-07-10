
'use server';

/**
 * @fileOverview A flow to generate a cover letter draft tailored to a specific internship.
 *
 * - generateCoverLetter - A function that handles the cover letter generation process.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import { generateWithFallback } from '@/ai/with-fallback';
import type { GenerateCoverLetterInput, GenerateCoverLetterOutput } from '@/ai/schemas';
import { GenerateCoverLetterInputSchema, GenerateCoverLetterOutputSchema } from '@/ai/schemas';

export async function generateCoverLetter(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  config: {
    temperature: 0.6,
  },
  prompt: `You are an expert career coach writing a cover letter on behalf of an engineering student.

Candidate's Resume:
{{{resumeContent}}}

Internship:
- Title: {{{internship.title}}}
- Company: {{{internship.company}}}
- Required Skills: {{#each internship.requiredSkills}}{{{this}}}, {{/each}}
- Description: {{{internship.description}}}

Write a complete, ready-to-edit cover letter (250-400 words) for this specific internship. It should:
- Open by naming the role and company.
- Connect 2-3 specific things from the resume to this internship's requirements.
- Sound genuine and specific to this role, not generic.
- Close with a confident, brief call to action.
Do not include placeholder brackets like [Your Name] — write it as a finished draft the candidate can lightly edit.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await generateWithFallback(prompt, input, GenerateCoverLetterOutputSchema);
    return output!;
  }
);

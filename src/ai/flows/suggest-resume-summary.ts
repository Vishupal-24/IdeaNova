'use server';

/**
 * @fileOverview A flow to suggest a resume summary based on the resume content.
 *
 * - suggestResumeSummary - A function that handles the resume summary suggestion process.
 * - SuggestResumeSummaryInput - The input type for the suggestResumeSummary function.
 * - SuggestResumeSummaryOutput - The return type for the suggestResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import type { SuggestResumeSummaryInput, SuggestResumeSummaryOutput } from '@/ai/schemas';
import { SuggestResumeSummaryInputSchema, SuggestResumeSummaryOutputSchema } from '@/ai/schemas';


export async function suggestResumeSummary(
  input: SuggestResumeSummaryInput
): Promise<SuggestResumeSummaryOutput> {
  return suggestResumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeSummaryPrompt',
  input: {schema: SuggestResumeSummaryInputSchema},
  output: {schema: SuggestResumeSummaryOutputSchema},
  prompt: `You are an AI resume expert. Based on the resume content provided, suggest a professional and effective summary for the resume. The summary should be concise and highlight the key skills and experiences. Make sure to not exceed 4 sentences.

Resume Content: {{{resumeContent}}}`,
});

const suggestResumeSummaryFlow = ai.defineFlow(
  {
    name: 'suggestResumeSummaryFlow',
    inputSchema: SuggestResumeSummaryInputSchema,
    outputSchema: SuggestResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

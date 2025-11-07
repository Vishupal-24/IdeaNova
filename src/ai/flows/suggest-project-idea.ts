
'use server';

/**
 * @fileOverview A flow to suggest project ideas for engineering students.
 *
 * - suggestProjectIdea - A function that handles the project idea suggestion process.
 * - SuggestProjectIdeaInput - The input type for the suggestProjectIdea function.
 * - SuggestProjectIdeaOutput - The return type for the suggestProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import type { SuggestProjectIdeaInput, SuggestProjectIdeaOutput } from '@/ai/schemas';
import { SuggestProjectIdeaInputSchema, SuggestProjectIdeaOutputSchema } from '@/ai/schemas';

export async function suggestProjectIdea(
  input: SuggestProjectIdeaInput
): Promise<SuggestProjectIdeaOutput> {
  return suggestProjectIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectIdeaPrompt',
  input: {schema: SuggestProjectIdeaInputSchema},
  output: {schema: SuggestProjectIdeaOutputSchema},
  prompt: `You are an expert engineering mentor who provides students with project ideas to build their portfolio. 
A student is interested in the following field: {{{fieldOfInterest}}}.

Based on this, generate a list of 3-4 creative and practical project ideas. 
These projects should be suitable for an undergraduate engineering student to build and showcase on their resume.

For each project, provide:
1.  **title**: A catchy and descriptive title.
2.  **description**: A detailed paragraph explaining what the project is, its key features, and why it's a valuable project to build.
3.  **technologies**: A list of recommended technologies, programming languages, or tools that would be suitable for building the project.
`,
});

const suggestProjectIdeaFlow = ai.defineFlow(
  {
    name: 'suggestProjectIdeaFlow',
    inputSchema: SuggestProjectIdeaInputSchema,
    outputSchema: SuggestProjectIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

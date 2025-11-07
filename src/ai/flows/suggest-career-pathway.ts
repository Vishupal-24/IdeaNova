
'use server';

/**
 * @fileOverview A flow to suggest a personalized career pathway for a student.
 *
 * - suggestCareerPathway - A function that handles the career pathway suggestion process.
 * - SuggestCareerPathwayInput - The input type for the suggestCareerPathway function.
 * - SuggestCareerPathwayOutput - The return type for the suggestCareerPathway function.
 */

import {ai} from '@/ai/genkit';
import type { SuggestCareerPathwayInput, SuggestCareerPathwayOutput } from '@/ai/schemas';
import { SuggestCareerPathwayInputSchema, SuggestCareerPathwayOutputSchema } from '@/ai/schemas';


export async function suggestCareerPathway(
  input: SuggestCareerPathwayInput
): Promise<SuggestCareerPathwayOutput> {
  return suggestCareerPathwayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCareerPathwayPrompt',
  input: {schema: SuggestCareerPathwayInputSchema},
  output: {schema: SuggestCareerPathwayOutputSchema},
  prompt: `You are an expert career advisor for engineering students. A student is asking for a personalized career pathway.

Career Goal: {{{careerGoal}}}
Current Skills: 
{{#each currentSkills}}
- {{{this}}}
{{/each}}

Based on this information, create a detailed, step-by-step career pathway with a mix of courses, hands-on projects, and potential internship types or skills to acquire. 
The pathway should be a logical progression, starting from foundational knowledge and moving towards more advanced topics relevant to the engineering career goal.
Generate about 5-7 milestones.
For each milestone, you MUST provide a 'type', 'title', 'duration', and a short 'description'. 
The valid types are 'course', 'project', 'internship', and 'skill'.`,
});

const suggestCareerPathwayFlow = ai.defineFlow(
  {
    name: 'suggestCareerPathwayFlow',
    inputSchema: SuggestCareerPathwayInputSchema,
    outputSchema: SuggestCareerPathwayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


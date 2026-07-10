
'use server';

/**
 * @fileOverview A flow to score how well a candidate's resume matches a specific internship.
 *
 * - matchResumeToInternship - A function that handles the resume-to-internship matching process.
 * - MatchResumeToInternshipInput - The input type for the matchResumeToInternship function.
 * - MatchResumeToInternshipOutput - The return type for the matchResumeToInternship function.
 */

import {ai} from '@/ai/genkit';
import type { MatchResumeToInternshipInput, MatchResumeToInternshipOutput } from '@/ai/schemas';
import { MatchResumeToInternshipInputSchema, MatchResumeToInternshipOutputSchema } from '@/ai/schemas';

export async function matchResumeToInternship(
  input: MatchResumeToInternshipInput
): Promise<MatchResumeToInternshipOutput> {
  return matchResumeToInternshipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchResumeToInternshipPrompt',
  input: {schema: MatchResumeToInternshipInputSchema},
  output: {schema: MatchResumeToInternshipOutputSchema},
  config: {
    temperature: 0.3,
  },
  prompt: `You are an experienced technical recruiter evaluating a candidate for an internship.

Candidate's Resume:
{{{resumeContent}}}

Internship:
- Title: {{{internship.title}}}
- Company: {{{internship.company}}}
- Required Skills: {{#each internship.requiredSkills}}{{{this}}}, {{/each}}
- Eligibility: {{{internship.eligibility}}}
- Description: {{{internship.description}}}

Evaluate how well this resume matches this specific internship. Be honest and specific — do not inflate the score.
Provide:
1. score: an overall match score from 0-100.
2. matchStrength: 'good' (score 75+), 'moderate' (50-74), or 'low' (below 50).
3. strengths: 2-3 concrete ways the resume aligns with this internship's requirements.
4. gaps: 1-2 concrete skills or experiences the candidate is missing, phrased constructively.`,
});

const matchResumeToInternshipFlow = ai.defineFlow(
  {
    name: 'matchResumeToInternshipFlow',
    inputSchema: MatchResumeToInternshipInputSchema,
    outputSchema: MatchResumeToInternshipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

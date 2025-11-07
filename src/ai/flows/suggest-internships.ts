
'use server';

/**
 * @fileOverview An AI flow to recommend internships to candidates.
 *
 * - suggestInternships - A function that suggests internships based on candidate profile.
 * - SuggestInternshipsInput - The input type for the suggestInternships function.
 * - SuggestInternshipsOutput - The return type for the suggestInternships function.
 */

import {ai} from '@/ai/genkit';
import type { SuggestInternshipsInput, SuggestInternshipsOutput } from '@/ai/schemas';
import { SuggestInternshipsInputSchema, SuggestInternshipsOutputSchema } from '@/ai/schemas';
import { internshipData } from '@/components/internships/internship-data';

export async function suggestInternships(
  input: SuggestInternshipsInput
): Promise<SuggestInternshipsOutput> {
  return suggestInternshipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInternshipsPrompt',
  input: {schema: SuggestInternshipsInputSchema},
  output: {schema: SuggestInternshipsOutputSchema},
  prompt: `You are an AI-powered internship recommendation engine for the PM Internship Scheme portal.
Your goal is to act as a lightweight, rule-based scoring system to help candidates, many of whom are first-generation learners with limited digital exposure, find suitable internships.
You need to suggest 3-5 relevant internships from the list provided below based on the candidate's profile.

**Candidate Profile:**
*   **Skills:** {{{skills}}}
*   **Field of Interest:** {{{interest}}}
*   **Preferred Location:** {{{location}}}

**Task:**
Analyze the list of available internships and select the top 3-5 that best match the candidate's profile.
For each recommendation, you MUST provide:
1.  **internship**: The full JSON object of the recommended internship.
2.  **matchStrength**: A match score based on the following rules:
    -   'good': A very strong match on skills AND interest. Location is a bonus.
    -   'moderate': A good match on either skills OR interest.
    -   'low': A potential match, but doesn't strongly align with skills or interest.
3.  **reason**: A very short, simple sentence explaining why it's a good match (e.g., "Matches your Python skill," "Aligns with your Data Science interest").

Prioritize matches based on skills, then interest, then location. "Remote" is a valid location preference.
You MUST return only the JSON output, without any extra text or explanation.

**Available Internships:**
{{{json internshipData}}}
`,
});

const suggestInternshipsFlow = ai.defineFlow(
  {
    name: 'suggestInternshipsFlow',
    inputSchema: SuggestInternshipsInputSchema,
    outputSchema: SuggestInternshipsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({...input, internshipData});
    return output!;
  }
);

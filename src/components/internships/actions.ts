
'use server';

import { suggestInternships } from '@/ai/flows/suggest-internships';
import { matchResumeToInternship } from '@/ai/flows/match-resume-to-internship';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import type {
  SuggestInternshipsInput,
  SuggestInternshipsOutput,
  MatchResumeToInternshipInput,
  MatchResumeToInternshipOutput,
  GenerateCoverLetterInput,
  GenerateCoverLetterOutput,
} from '@/ai/schemas';

export async function getInternshipRecommendations(input: SuggestInternshipsInput): Promise<{ success: boolean; data: SuggestInternshipsOutput | null; error: string | null }> {
  try {
    const result = await suggestInternships(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to get recommendations: ${errorMessage}` };
  }
}

export async function getResumeMatch(input: MatchResumeToInternshipInput): Promise<{ success: boolean; data: MatchResumeToInternshipOutput | null; error: string | null }> {
  try {
    const result = await matchResumeToInternship(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to compute resume match: ${errorMessage}` };
  }
}

export async function getCoverLetter(input: GenerateCoverLetterInput): Promise<{ success: boolean; data: GenerateCoverLetterOutput | null; error: string | null }> {
  try {
    const result = await generateCoverLetter(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to generate cover letter: ${errorMessage}` };
  }
}

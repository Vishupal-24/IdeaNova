
'use server';

import { suggestInternships } from '@/ai/flows/suggest-internships';
import type { SuggestInternshipsInput, SuggestInternshipsOutput } from '@/ai/schemas';

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

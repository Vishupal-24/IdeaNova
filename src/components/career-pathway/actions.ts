
'use server';

import { suggestCareerPathway } from '@/ai/flows/suggest-career-pathway';
import type { SuggestCareerPathwayInput, SuggestCareerPathwayOutput } from '@/ai/schemas';

export async function generatePathwayAction(input: SuggestCareerPathwayInput): Promise<{ success: boolean; data: SuggestCareerPathwayOutput | null; error: string | null }> {
  try {
    const result = await suggestCareerPathway(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to generate pathway: ${errorMessage}` };
  }
}

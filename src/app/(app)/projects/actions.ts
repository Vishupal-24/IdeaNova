
'use server';

import { suggestProjectIdea } from '@/ai/flows/suggest-project-idea';
import type { SuggestProjectIdeaInput, SuggestProjectIdeaOutput } from '@/ai/schemas';

export async function getProjectIdeas(input: SuggestProjectIdeaInput): Promise<{ success: boolean; data: SuggestProjectIdeaOutput | null; error: string | null }> {
  try {
    const result = await suggestProjectIdea(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to get project ideas: ${errorMessage}` };
  }
}

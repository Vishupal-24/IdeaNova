'use server';

import { suggestStream } from '@/ai/flows/suggest-stream';
import type { SuggestStreamInput, SuggestStreamOutput } from '@/ai/schemas';

export async function getStreamSuggestion(input: SuggestStreamInput): Promise<{ success: boolean; data: SuggestStreamOutput | null; error: string | null }> {
  try {
    const result = await suggestStream(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, data: null, error: `Failed to get suggestion: ${errorMessage}` };
  }
}

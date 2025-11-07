'use server';

import { suggestResumeSummary } from '@/ai/flows/suggest-resume-summary';

export async function generateSummaryAction(resumeContent: string) {
  try {
    const result = await suggestResumeSummary({ resumeContent });
    return { success: true, summary: result.summary, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, summary: null, error: `Failed to generate summary: ${errorMessage}` };
  }
}

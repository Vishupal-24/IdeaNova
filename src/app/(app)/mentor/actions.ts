'use server';

import { provideCareerMentorship } from '@/ai/flows/provide-career-mentorship';

export async function getMentorResponse(question: string) {
  try {
    const result = await provideCareerMentorship({ question });
    return { success: true, answer: result.answer, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, answer: null, error: `Failed to get response: ${errorMessage}` };
  }
}

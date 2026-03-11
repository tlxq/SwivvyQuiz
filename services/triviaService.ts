import { Config } from '@/constants/config';
import type { TriviaResponse, TriviaCategoriesResponse } from '@/types/trivia';

const BASE_URL = Config.triviaApiUrl;

export async function fetchTriviaQuestions(
  amount: number = 10,
): Promise<TriviaResponse> {
  const response = await fetch(
    `${BASE_URL}/api.php?amount=${amount}&type=boolean`,
  );
  if (!response.ok) throw new Error('Failed to fetch trivia questions');
  return response.json() as Promise<TriviaResponse>;
}

export async function fetchTriviaCategories(): Promise<TriviaCategoriesResponse> {
  const response = await fetch(`${BASE_URL}/api_category.php`);
  if (!response.ok) throw new Error('Failed to fetch trivia categories');
  return response.json() as Promise<TriviaCategoriesResponse>;
}

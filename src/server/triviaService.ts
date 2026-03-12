import { Config } from '@/constants/config';
import type { TriviaResponse, TriviaCategoriesResponse } from '@/types/trivia';

const BASE_URL = Config.triviaApiUrl;

// We build the URL with URLSearchParams so it's easy to extend with more filters
// (difficulty, type) later without string concatenation getting messy.
export async function fetchTriviaQuestions(
  amount: number = 10,
  categoryId?: number,
): Promise<TriviaResponse> {
  const params = new URLSearchParams({
    amount: String(amount),
    type: 'boolean',
  });
  if (categoryId !== undefined) params.set('category', String(categoryId));

  const response = await fetch(`${BASE_URL}/api.php?${params}`);
  if (!response.ok) throw new Error('Failed to fetch trivia questions');
  return response.json() as Promise<TriviaResponse>;
}

export async function fetchTriviaCategories(): Promise<TriviaCategoriesResponse> {
  const response = await fetch(`${BASE_URL}/api_category.php`);
  if (!response.ok) throw new Error('Failed to fetch trivia categories');

  const allowedIds = [9, 11, 21, 18, 15]; // General Knowledge, Movies, Games, Computers, Sports]
  const data = (await response.json()) as TriviaCategoriesResponse;
  return {
    ...data,
    trivia_categories: data.trivia_categories.filter((cat) =>
      allowedIds.includes(cat.id),
    ),
  };
}

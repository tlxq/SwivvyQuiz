import { TriviaCategory, TriviaResponse } from '@/types';

const BASE_URL = 'https://opentdb.com';

export const triviaService = {
  async getCategories(): Promise<TriviaCategory[]> {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    if (!response.ok) throw new Error('Could not fetch categories');
    const data = await response.json();
    return data.trivia_categories;
  },

  async getQuestions(categoryId: number, amount: number = 10): Promise<TriviaResponse> {
    const response = await fetch(`${BASE_URL}/api.php?amount=${amount}&category=${categoryId}&type=boolean`);
    if (!response.ok) throw new Error('Could not fetch questions');
    return response.json();
  }
};

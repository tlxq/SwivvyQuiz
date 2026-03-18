import { TriviaCategory, TriviaResponse } from '@/types';
import { QUIZ_SETTINGS } from '@/config';

const BASE_URL = 'https://opentdb.com';

let categoryCache: { data: TriviaCategory[]; timestamp: number } | null = null;

const ERROR_MESSAGES = {
  RATE_LIMIT: 'API rate limit reached. Please wait and try again.',
  NO_BOOLEAN:
    'No boolean questions available for this category. Please choose another.',
  NETWORK: 'Network error. Please try again.',
};

/**
 * Unified API wrapper for standard error handling and JSON parsing.
 */
const apiFetch = async (endpoint: string) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (res.status === 429) throw new Error(ERROR_MESSAGES.RATE_LIMIT);
    if (!res.ok) throw new Error(ERROR_MESSAGES.NETWORK);
    return res.json();
  } catch (e) {
    if (e instanceof Error && Object.values(ERROR_MESSAGES).includes(e.message))
      throw e;
    throw new Error(ERROR_MESSAGES.NETWORK);
  }
};

export const triviaService = {
  /**
   * Fetches all categories with local caching.
   */
  async getAllCategories(): Promise<TriviaCategory[]> {
    const now = Date.now();
    if (
      categoryCache &&
      now - categoryCache.timestamp < QUIZ_SETTINGS.CACHE_TTL
    ) {
      return categoryCache.data;
    }

    const data = await apiFetch('/api_category.php');
    categoryCache = { data: data.trivia_categories, timestamp: now };
    return data.trivia_categories;
  },

  /**
   * Fetches questions for a category.
   */
  async getQuestions(categoryId: number): Promise<TriviaResponse> {
    const { QUESTION_AMOUNT, QUESTION_TYPE } = QUIZ_SETTINGS;
    const data = await apiFetch(
      `/api.php?amount=${QUESTION_AMOUNT}&category=${categoryId}&type=${QUESTION_TYPE}`,
    );

    if (data.response_code !== 0 || !data.results?.length) {
      throw new Error(ERROR_MESSAGES.NO_BOOLEAN);
    }
    return data;
  },
};

export const QUIZ_SETTINGS = {
  TIMER_LIMIT: 15,
  QUESTION_AMOUNT: 10,
  QUESTION_TYPE: 'boolean' as const,
  DIFFICULTIES: ['easy', 'medium', 'hard'] as const,
  POINTS_PER_CORRECT: 10,
  CACHE_TTL: 1000 * 60 * 60, // 1 hour for categories cache
  MAX_HIGHSCORES: 5,
};

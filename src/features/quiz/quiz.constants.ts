export const TOTAL_QUESTIONS = 5;
export const TIMER_DURATION = 15; // seconds per question
export const BASE_POINTS = 10; // awarded for any correct answer
export const MAX_BONUS = 5; // extra pts for fast answers (proportional to time left)
export const MAX_SCORE = TOTAL_QUESTIONS * (BASE_POINTS + MAX_BONUS); // 150

export const ERRORS = {
  CATEGORIES_FETCH: 'Failed to load categories',
  QUESTIONS_FETCH: 'Failed to load questions',
  NO_QUESTIONS: 'No questions found for this category',
} as const;

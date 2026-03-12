// These types mirror the Open Trivia DB API response shapes exactly.
// Keeping them here means a single update covers every consumer.

export interface TriviaQuestion {
  type: 'boolean' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;        // HTML-encoded — decoded in useTriviaQuestions before use
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;   // 0 = success; see OTD docs for other codes
  results: TriviaQuestion[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: TriviaCategory[];
}

// Expo Router serialises all route params to strings, so categoryId is a string
// here even though the API expects a number. Convert it at the call site.
export interface QuizScreenParams {
  categoryId: string;
  categoryName: string;
}

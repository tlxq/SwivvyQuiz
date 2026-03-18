// Open Trivia API types
export interface TriviaCategory {
  id: number;
  name: string;
}

export interface TriviaQuestion {
  category: string;
  type: 'boolean';
  question: string;
  correct_answer: 'True' | 'False';
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaGlobalCounts {
  categories: {
    [key: string]: {
      total_question_count: number;
      total_easy_question_count: number;
      total_medium_question_count: number;
      total_hard_question_count: number;
      total_boolean_question_count: number;
    }
  }
}

// Internal Highscore type
export interface HighScoreEntry {
  id?: string;
  username: string;
  score: number;
  category: string;
  timestamp: number;
}

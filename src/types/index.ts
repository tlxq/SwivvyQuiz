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

// Internal Highscore type
export interface HighScoreEntry {
  id?: string;
  username: string;
  score: number;
  category: string;
  timestamp: number;
}

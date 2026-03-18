import type { ViewStyle } from 'react-native';
import type React from 'react';
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
    };
  };
}

export interface HighScoreEntry {
  id?: string;
  username: string;
  score: number;
  category: string;
  timestamp: number;
}

export interface ScreenProps {
  loading: boolean;
  error: string | null;
  onBack: () => void;
  children: React.ReactNode;
}

export interface QuizState {
  questions: TriviaQuestion[];
  currentIndex: number;
  score: number;
  isGameOver: boolean;
  timeLeft: number;
}

export interface HighScoreItemProps {
  item: HighScoreEntry;
  index: number;
}

export interface ErrorDisplayProps {
  message: string;
  onBack: () => void;
}

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export type ButtonVariant = 'primary' | 'success' | 'danger' | 'surface';

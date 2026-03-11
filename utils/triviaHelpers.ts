import type { TriviaQuestion } from '@/types/trivia';

/** Placeholder – replace with a proper HTML decode utility when needed. */
export function decodeHtmlEntities(text: string): string {
  return text;
}

export function isCorrectAnswer(
  question: TriviaQuestion,
  answer: string,
): boolean {
  return question.correct_answer.toLowerCase() === answer.toLowerCase();
}

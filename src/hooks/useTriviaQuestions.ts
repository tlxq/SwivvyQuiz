import { useState, useEffect, useCallback } from 'react';
import { fetchTriviaQuestions } from '@/server/triviaService';
import { decodeHtmlEntities } from '@/utils/triviaHelpers';
import type { TriviaQuestion } from '@/types/trivia';

// Accepts an options object so callers can add categoryId without a breaking
// signature change if we add more filters (difficulty, type) in the future.
interface UseTriviaQuestionsOptions {
  amount?: number;
  // When undefined the API returns a random mix from all categories.
  categoryId?: number;
}

interface UseTriviaQuestionsResult {
  questions: TriviaQuestion[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Fetches questions and decodes HTML entities centrally so no component has to.
export function useTriviaQuestions(
  { amount = 10, categoryId }: UseTriviaQuestionsOptions = {},
): UseTriviaQuestionsResult {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTriviaQuestions(amount, categoryId);
      // Decode at the hook level — every future screen gets clean strings for free
      setQuestions(
        data.results.map((q) => ({
          ...q,
          question:          decodeHtmlEntities(q.question),
          correct_answer:    decodeHtmlEntities(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [amount, categoryId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { questions, loading, error, refetch: load };
}

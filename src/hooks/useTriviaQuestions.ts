import { useState, useEffect, useCallback } from 'react';
import { fetchTriviaQuestions } from '@/server/triviaService';
import type { TriviaQuestion } from '@/types/trivia';

interface UseTriviaQuestionsResult {
  questions: TriviaQuestion[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTriviaQuestions(
  amount: number = 10,
): UseTriviaQuestionsResult {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTriviaQuestions(amount);
      setQuestions(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [amount]);

  useEffect(() => {
    void load();
  }, [load]);

  return { questions, loading, error, refetch: load };
}

import { useState, useEffect, useCallback } from 'react';
import { fetchTriviaQuestions } from '@/server/triviaService';
import { decodeHtmlEntities } from '@/utils/triviaHelpers';
import type { TriviaQuestion } from '@/types/trivia';

// Accepts an options object so callers can add filters without a breaking
// signature change (e.g. difficulty, type) in the future.
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

  // Bumping this counter forces the effect to re-run without changing
  // amount or categoryId — used by the "Try again" button on error.
  const [fetchKey, setFetchKey] = useState(0);
  const refetch = useCallback(() => setFetchKey((n) => n + 1), []);

  useEffect(() => {
    // The `cancelled` flag prevents a slower earlier request from overwriting
    // results from a faster later request when categoryId changes mid-flight.
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchTriviaQuestions(amount, categoryId)
      .then((data) => {
        if (cancelled) return;
        // Decode at the hook level — every consumer gets clean strings for free
        setQuestions(
          data.results.map((q) => ({
            ...q,
            question:          decodeHtmlEntities(q.question),
            correct_answer:    decodeHtmlEntities(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
          })),
        );
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      });

    return () => { cancelled = true; };
    // fetchKey is intentionally included so refetch() forces a re-run even
    // when amount and categoryId haven't changed (e.g. retrying after an error).
  }, [amount, categoryId, fetchKey]);

  return { questions, loading, error, refetch };
}

import { useState, useCallback } from 'react';
import { fetchTriviaCategories } from '@/server/triviaService';
import type { TriviaCategory } from '@/types/trivia';

interface UseTriviaCategories {
  categories: TriviaCategory[];
  loading: boolean;
  error: string | null;
  // Intentionally lazy — we only want to hit the API when the user taps "Enter",
  // not on every mount of the Home screen.
  load: () => Promise<void>;
}

// Separated from useTriviaQuestions because categories are fetched once on demand
// rather than automatically every time a quiz is started.
export function useTriviaCategories(): UseTriviaCategories {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTriviaCategories();
      setCategories(data.trivia_categories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, loading, error, load };
}

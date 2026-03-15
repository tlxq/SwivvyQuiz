import { useState, useCallback } from 'react';
import {
  fetchTriviaCategories,
} from '../services/triviaService';
import { ERRORS } from '../quiz.constants';
import type { TriviaCategory } from '../quiz.types';

/**
 * useQuizSetup - Logic for fetching and managing quiz categories.
 */
export function useQuizSetup() {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTriviaCategories();
      setCategories(data.trivia_categories);
    } catch (err) {
      setError(ERRORS.CATEGORIES_FETCH);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
}

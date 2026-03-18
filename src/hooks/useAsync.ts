import { useState, useCallback } from 'react';

/**
 * Custom hook for handling asynchronous operations with loading and error states.
 * @param initialLoading Optional initial loading state (defaults to false).
 */
export function useAsync<T>(initialLoading: boolean = false) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  /**
   * Resets the async state to its initial values.
   */
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const execute = useCallback(async (promise: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await promise;
      setData(response);
      return response;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Something went wrong';
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, setData, loading, error, execute, reset };
}

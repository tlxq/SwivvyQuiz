import { useState, useCallback } from 'react';

export function useAsync<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (promise: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await promise;
      setData(response);
      return response;
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}

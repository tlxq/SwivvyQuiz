import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HighScoreEntry {
  categoryId: string;
  categoryName: string;
  score: number;
}

const STORAGE_KEY = 'swivvyquiz_highscores';

// Manages per-category best scores in AsyncStorage.
// Lazy: call load() on mount to populate, save() after each finished quiz.
export function useHighScore() {
  const [scores, setScores] = useState<HighScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setScores(raw !== null ? (JSON.parse(raw) as HighScoreEntry[]) : []);
    } catch {
      // Non-critical — just show an empty list if storage is unavailable
      setScores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (entry: HighScoreEntry) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const all: HighScoreEntry[] = raw !== null ? (JSON.parse(raw) as HighScoreEntry[]) : [];

      const idx = all.findIndex((e) => e.categoryId === entry.categoryId);
      if (idx >= 0) {
        // Only overwrite if the new score beats the existing record
        if (entry.score > all[idx].score) all[idx] = entry;
      } else {
        all.push(entry);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      setScores([...all]);
    } catch {
      // Silently ignore — losing a high-score entry is better than crashing
    }
  }, []);

  return { scores, loading, load, save };
}

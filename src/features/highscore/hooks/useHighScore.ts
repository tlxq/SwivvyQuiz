import { useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import type { HighScoreEntry } from '../highscore.types';
import { db } from '@/lib/firebase.client';

const HIGHSCORES_COLLECTION = 'highscores';

/**
 * Manages highscores with Firebase Firestore.
 *
 * API-compatible with useHighScore for minimal code changes.
 * Supports top-5 global scores and per-category tracking.
 */
export default function useHighScore() {
  const [scores, setScores] = useState<HighScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Load top 5 scores globally (or per category if categoryId provided)
   */
  const load = useCallback(async (categoryId?: string) => {
    setLoading(true);
    try {
      let q;
      if (categoryId) {
        // Get top 5 for a specific category
        q = query(
          collection(db, HIGHSCORES_COLLECTION),
          where('categoryId', '==', categoryId),
          orderBy('score', 'desc'),
          limit(5),
        );
      } else {
        // Get top 5 globally
        q = query(
          collection(db, HIGHSCORES_COLLECTION),
          orderBy('score', 'desc'),
          limit(5),
        );
      }

      const snapshot = await getDocs(q);
      const loaded: HighScoreEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loaded.push({
          id: doc.id,
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          score: data.score,
          username: data.username || 'Anonymous',
          timestamp: data.timestamp?.toMillis?.() || Date.now(),
        });
      });
      setScores(loaded);
    } catch (error) {
      console.error('Error loading highscores:', error);
      setScores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Save a score. Returns true if it's in the top 5, false otherwise.
   */
  const save = useCallback(async (entry: HighScoreEntry): Promise<boolean> => {
    setLoading(true);
    try {
      // Check if this score would be in the top 5
      const q = query(
        collection(db, HIGHSCORES_COLLECTION),
        orderBy('score', 'desc'),
        limit(5),
      );
      const snapshot = await getDocs(q);
      const topScores = snapshot.docs.map((doc) => doc.data().score);

      // If we have fewer than 5 scores, or this score beats the 5th place
      const isTopFive =
        topScores.length < 5 || entry.score > Math.min(...topScores);

      // Save to Firestore
      await addDoc(collection(db, HIGHSCORES_COLLECTION), {
        categoryId: entry.categoryId,
        categoryName: entry.categoryName,
        score: entry.score,
        username: entry.username || 'Anonymous',
        timestamp: Timestamp.now(),
      });

      return isTopFive;
    } catch (error) {
      console.error('Error saving score:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if a score would be in the top 5 (without saving)
   */
  const isTopFive = useCallback(async (score: number): Promise<boolean> => {
    try {
      const q = query(
        collection(db, HIGHSCORES_COLLECTION),
        orderBy('score', 'desc'),
        limit(5),
      );
      const snapshot = await getDocs(q);
      const topScores = snapshot.docs.map((doc) => doc.data().score);

      return topScores.length < 5 || score > Math.min(...topScores);
    } catch (error) {
      console.error('Error checking top 5:', error);
      return false;
    }
  }, []);

  return { scores, loading, load, save, isTopFive };
}

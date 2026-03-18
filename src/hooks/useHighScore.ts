import { useCallback } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc 
} from 'firebase/firestore';
import { db } from '@/lib/firebase.client';
import { HighScoreEntry } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { QUIZ_SETTINGS } from '@/config/triviaConfig';

/**
 * Hook for managing global highscores with Firebase Firestore.
 */
export function useHighScore() {
  const { data: scores, loading, error, execute } = useAsync<HighScoreEntry[]>();

  const loadTopScores = useCallback(async () => {
    const fetchScores = async (): Promise<HighScoreEntry[]> => {
      const q = query(
        collection(db, 'highscores'),
        orderBy('score', 'desc'),
        limit(QUIZ_SETTINGS.MAX_HIGHSCORES)
      );
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HighScoreEntry));
    };
    return execute(fetchScores());
  }, [execute]);

  const saveScore = useCallback(async (entry: Omit<HighScoreEntry, 'id'>) => {
    return addDoc(collection(db, 'highscores'), entry);
  }, []);

  /**
   * Optimized check to see if a score belongs in the top leaderboard.
   * If scores are already loaded in state, it uses those instead of a network call.
   */
  const checkIfTopFive = useCallback(async (score: number) => {
    let topScores: number[];

    if (scores && scores.length > 0) {
      topScores = scores.map(s => s.score);
    } else {
      const q = query(collection(db, 'highscores'), orderBy('score', 'desc'), limit(QUIZ_SETTINGS.MAX_HIGHSCORES));
      const snap = await getDocs(q);
      topScores = snap.docs.map(doc => doc.data().score as number);
    }
    
    // Eligible if list isn't full OR if score is better than the lowest existing top score
    return topScores.length < QUIZ_SETTINGS.MAX_HIGHSCORES || score > Math.min(...topScores);
  }, [scores]);

  return { scores: scores || [], loading, error, loadTopScores, saveScore, checkIfTopFive };
}

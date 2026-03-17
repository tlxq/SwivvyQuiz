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

export function useHighScore() {
  const { data, loading, error, execute } = useAsync<HighScoreEntry[]>();

  const loadTopScores = useCallback(async () => {
    const fetchScores = async (): Promise<HighScoreEntry[]> => {
      const q = query(
        collection(db, 'highscores'),
        orderBy('score', 'desc'),
        limit(5)
      );
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HighScoreEntry));
    };
    return execute(fetchScores());
  }, [execute]);

  const saveScore = useCallback(async (entry: Omit<HighScoreEntry, 'id'>) => {
    return addDoc(collection(db, 'highscores'), entry);
  }, []);

  const checkIfTopFive = useCallback(async (score: number) => {
    const q = query(collection(db, 'highscores'), orderBy('score', 'desc'), limit(5));
    const snap = await getDocs(q);
    const topScores = snap.docs.map(doc => doc.data().score as number);
    
    // It's a highscore if we have fewer than 5 entries OR if we beat the lowest top 5 score
    return topScores.length < 5 || score > Math.min(...topScores);
  }, []);

  return { scores: data || [], loading, error, loadTopScores, saveScore, checkIfTopFive };
}

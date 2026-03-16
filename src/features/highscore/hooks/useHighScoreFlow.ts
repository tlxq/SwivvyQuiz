import { useState, useEffect, useCallback } from 'react';
import { useHighScore } from './useHighScore';
import type { HighScoreFlowProps } from '../highscore.types';

// Handles highscore check + modal state for quiz end
export function useHighScoreFlow({
  score,
  isCompleted,
  categoryId,
  categoryName,
}: HighScoreFlowProps) {
  const { save, isTopFive, loading } = useHighScore();
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isCompleted && !checked) {
      setChecked(true);
      isTopFive(score).then((inTop) => {
        if (inTop) {
          setShowModal(true);
        } else {
          save({
            categoryId,
            categoryName,
            score,
            username: 'Anonymous',
          });
        }
      });
    }
  }, [isCompleted, checked, score, categoryId, categoryName, isTopFive, save]);

  // called on retry/game restart
  const reset = useCallback(() => {
    setChecked(false);
    setShowModal(false);
  }, []);

  // called with username
  const handleSave = useCallback(async (name: string) => {
    await save({ categoryId, categoryName, score, username: name });
    setShowModal(false);
  }, [categoryId, categoryName, score, save]);

  return {
    showModal,
    loading,
    handleSave,
    reset,
  };
}

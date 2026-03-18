import { useState, useCallback, useEffect } from 'react';
import { TriviaQuestion, QuizState } from '@/types';
import { QUIZ_SETTINGS } from '@/config';

/**
 * Custom hook for managing the trivia game state, timer, and score.
 */
export function useQuizGame(questions: TriviaQuestion[]) {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    isGameOver: false,
    timeLeft: QUIZ_SETTINGS.TIMER_LIMIT,
  });

  /**
   * Initialize or reset the game when questions are provided.
   */
  useEffect(() => {
    if (questions && questions.length > 0) {
      setState({
        questions,
        currentIndex: 0,
        score: 0,
        isGameOver: false,
        timeLeft: QUIZ_SETTINGS.TIMER_LIMIT,
      });
    }
  }, [questions]);

  /**
   * Handles the countdown timer logic.
   * Auto-advances to the next question when time runs out.
   */
  useEffect(() => {
    if (state.isGameOver || state.questions.length === 0) return;

    const interval = setInterval(() => {
      setState((s) => {
        if (s.timeLeft <= 1) {
          const isLast = s.currentIndex >= s.questions.length - 1;
          if (isLast) {
            return { ...s, isGameOver: true, timeLeft: 0 };
          }
          return {
            ...s,
            currentIndex: s.currentIndex + 1,
            timeLeft: QUIZ_SETTINGS.TIMER_LIMIT,
          };
        }
        return { ...s, timeLeft: s.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isGameOver, state.questions.length, state.currentIndex]);

  /**
   * Submits a user's answer and calculates the score.
   */
  const submitAnswer = useCallback((answer: string) => {
    setState((s) => {
      const current = s.questions[s.currentIndex];
      if (!current || s.isGameOver) return s;

      const isCorrect = answer === current.correct_answer;
      const newScore = isCorrect
        ? s.score + QUIZ_SETTINGS.POINTS_PER_CORRECT
        : s.score;
      const isLast = s.currentIndex >= s.questions.length - 1;

      if (isLast) {
        return {
          ...s,
          score: newScore,
          isGameOver: true,
          timeLeft: 0,
        };
      }

      return {
        ...s,
        score: newScore,
        currentIndex: s.currentIndex + 1,
        timeLeft: QUIZ_SETTINGS.TIMER_LIMIT,
      };
    });
  }, []);

  return { ...state, submitAnswer };
}

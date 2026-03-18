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
    userAnswers: [],
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
        userAnswers: [],
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
          const newAnswers = [...s.userAnswers, 'Timed Out'];

          if (isLast) {
            return { ...s, userAnswers: newAnswers, isGameOver: true, timeLeft: 0 };
          }
          return {
            ...s,
            currentIndex: s.currentIndex + 1,
            userAnswers: newAnswers,
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
      const timeBonus = isCorrect
        ? s.timeLeft * QUIZ_SETTINGS.BONUS_PER_SECONDS
        : 0;
      const newScore = isCorrect
        ? s.score + QUIZ_SETTINGS.POINTS_PER_CORRECT + timeBonus
        : s.score;
      const newAnswers = [...s.userAnswers, answer];
      const isLast = s.currentIndex >= s.questions.length - 1;

      if (isLast) {
        return {
          ...s,
          score: newScore,
          userAnswers: newAnswers,
          isGameOver: true,
          timeLeft: 0,
        };
      }

      return {
        ...s,
        score: newScore,
        currentIndex: s.currentIndex + 1,
        userAnswers: newAnswers,
        timeLeft: QUIZ_SETTINGS.TIMER_LIMIT,
      };
    });
  }, []);

  return { ...state, submitAnswer };
}

import { useState, useCallback, useEffect } from 'react';
import { TriviaQuestion } from '@/types';

interface QuizState {
  questions: TriviaQuestion[];
  currentIndex: number;
  score: number;
  isGameOver: boolean;
  timeLeft: number;
}

const TIMER_START = 15;

export function useQuizGame(questions: TriviaQuestion[]) {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    isGameOver: false,
    timeLeft: TIMER_START,
  });

  // Sync questions from prop when they load
  useEffect(() => {
    if (questions.length > 0 && state.questions.length === 0) {
      setState(s => ({ ...s, questions }));
    }
  }, [questions]);

  // Simple countdown timer
  useEffect(() => {
    if (state.isGameOver || state.questions.length === 0) return;

    const interval = setInterval(() => {
      setState(s => {
        if (s.timeLeft <= 1) {
          const isLast = s.currentIndex >= s.questions.length - 1;
          return {
            ...s,
            currentIndex: isLast ? s.currentIndex : s.currentIndex + 1,
            isGameOver: isLast,
            timeLeft: TIMER_START,
          };
        }
        return { ...s, timeLeft: s.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isGameOver, state.questions.length]);

  const submitAnswer = useCallback((answer: string) => {
    setState(s => {
      const current = s.questions[s.currentIndex];
      if (!current) return s;

      const isCorrect = answer === current.correct_answer;
      const newScore = isCorrect ? s.score + 10 : s.score;
      const isLast = s.currentIndex >= s.questions.length - 1;

      return {
        ...s,
        score: newScore,
        currentIndex: isLast ? s.currentIndex : s.currentIndex + 1,
        isGameOver: isLast,
        timeLeft: TIMER_START,
      };
    });
  }, []);

  return { ...state, submitAnswer };
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { decodeHtmlEntities } from '../quiz.utils';
import {
  TOTAL_QUESTIONS,
  TIMER_DURATION,
  BASE_POINTS,
  MAX_BONUS,
  ERRORS,
} from '../quiz.constants';
import { useQuizTimer } from './useQuizTimer';
import type { TriviaQuestion } from '../quiz.types';
import {
  fetchTriviaQuestions,
} from '../services/triviaService';

/**
 * useQuizGame - Main business logic for the quiz session.
 */
export function useQuizGame(categoryId?: number) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'True' | 'False' | null>(null);

  // We use a ref to track the current time for scoring, to avoid circular dependency with submitAnswer
  const currentTimeRef = useRef(TIMER_DURATION);

  const submitAnswer = useCallback(
    (choice: 'True' | 'False' | null) => {
      if (isAnswered || isCompleted || questions.length === 0) return;

      const currentQ = questions[questionIndex];
      if (!currentQ) return;

      setIsAnswered(true);
      setSelectedAnswer(choice);

      // Scoring: Base points + bonus based on remaining time
      if (choice === currentQ.correct_answer) {
        const bonus = Math.round((currentTimeRef.current / TIMER_DURATION) * MAX_BONUS);
        setScore((s) => s + BASE_POINTS + bonus);
      }

      // Small delay so user sees feedback (green/red highlight)
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        if (questionIndex + 1 < TOTAL_QUESTIONS) {
          setQuestionIndex((i) => i + 1);
        } else {
          setIsCompleted(true);
        }
      }, 700);
    },
    [isAnswered, isCompleted, questionIndex, questions],
  );

  const { timeLeft, barProgress } = useQuizTimer({
    duration: TIMER_DURATION,
    isEnabled: !isCompleted && !loading && questions.length > 0 && !isAnswered,
    onTimeUp: () => submitAnswer(null),
  });

  // Sync ref with timeLeft for scoring
  useEffect(() => {
    currentTimeRef.current = timeLeft;
  }, [timeLeft]);

  const resetQuiz = useCallback(() => {
    setQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCompleted(false);
  }, []);

  const loadQuestions = useCallback(async () => {
    if (categoryId === undefined) return;

    setLoading(true);
    setError(null);
    resetQuiz();

    try {
      const data = await fetchTriviaQuestions(TOTAL_QUESTIONS, categoryId);
      
      if (!data.results || data.results.length === 0) {
        setError(ERRORS.NO_QUESTIONS);
        return;
      }

      setQuestions(
        data.results.map((q) => ({
          ...q,
          question: decodeHtmlEntities(q.question),
          correct_answer: decodeHtmlEntities(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
        })),
      );
    } catch (err) {
      console.error('Fetch error:', err);
      setError(ERRORS.QUESTIONS_FETCH);
    } finally {
      setLoading(false);
    }
  }, [categoryId, resetQuiz]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    loading,
    error,
    questionIndex,
    score,
    isCompleted,
    isAnswered,
    selectedAnswer,
    timeLeft,
    barProgress,
    resetQuiz: loadQuestions,
    submitAnswer,
  };
}

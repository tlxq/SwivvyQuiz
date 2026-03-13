import { useState, useEffect, useCallback } from 'react';
import {
  fetchTriviaQuestions,
  fetchTriviaCategories,
} from '@/features/quiz/services';
import {
  decodeHtmlEntities,
  TOTAL_QUESTIONS,
  TIMER_DURATION,
  BASE_POINTS,
  MAX_BONUS,
} from '@/features/quiz';
import { useQuizTimer } from '@/features/quiz/hooks';
import type { TriviaQuestion, TriviaCategory } from '@/features/quiz';
/**
 * useQuiz - Main business logic for the quiz session.
 *
 * Separates API fetching (Trivia DB) from game state and scoring.
 * Encapsulates the "Question -> Answer -> Advance" loop.
 */
export default function useQuizGame() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'True' | 'False' | null>(
    null,
  );

  const [categoryId, setCategoryId] = useState<number | undefined>();

  const { timeLeft, barProgress } = useQuizTimer({
    duration: TIMER_DURATION,
    isEnabled: !isCompleted && !loading && questions.length > 0 && !isAnswered,
    onTimeUp: () => submitAnswer(null),
  });

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchTriviaCategories();
      setCategories(data.trivia_categories);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const resetQuiz = useCallback(() => {
    setQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setIsCompleted(false);
  }, []);

  const startQuiz = useCallback(
    (id?: number) => {
      resetQuiz();
      setCategoryId(id);
    },
    [resetQuiz],
  );

  const submitAnswer = useCallback(
    (choice: 'True' | 'False' | null) => {
      if (isAnswered || isCompleted || questions.length === 0) return;

      const currentQ = questions[questionIndex];
      if (!currentQ) return;

      setIsAnswered(true);
      setSelectedAnswer(choice);

      // Scoring: Base points + bonus based on remaining time
      if (choice === currentQ.correct_answer) {
        const bonus = Math.round((timeLeft / TIMER_DURATION) * MAX_BONUS);
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
    [isAnswered, isCompleted, questionIndex, questions, timeLeft],
  );

  useEffect(() => {
    if (categoryId === undefined) return;

    let active = true;
    setLoading(true);
    setError(null);

    fetchTriviaQuestions(TOTAL_QUESTIONS, categoryId)
      .then((data) => {
        if (!active) return;
        setQuestions(
          data.results.map((q) => ({
            ...q,
            question: decodeHtmlEntities(q.question),
            correct_answer: decodeHtmlEntities(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
          })),
        );
      })
      .catch(() => active && setError('Failed to load questions'))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [categoryId]);

  return {
    questions,
    categories,
    loading,
    loadingCategories,
    error,
    questionIndex,
    score,
    isCompleted,
    isAnswered,
    selectedAnswer,
    timeLeft,
    barProgress,
    loadCategories,
    startQuiz,
    submitAnswer,
    refetchQuestions: () => startQuiz(categoryId),
  };
}

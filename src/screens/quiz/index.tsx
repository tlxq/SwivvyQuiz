import { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { useTriviaQuestions } from '@/hooks/useTriviaQuestions';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { LoadingSpinner, ErrorMessage, ProgressBar, Button, ScreenWrapper } from '@/components/ui';
import { QuestionCard } from '@/components/quiz';
import { quizStyles } from '@/styles/screens/quizStyles';
import { colors } from '@/styles/colors';
import {
  TOTAL_QUESTIONS,
  TIMER_DURATION,
  BASE_POINTS,
  MAX_BONUS,
  MAX_SCORE,
} from '@/constants/quiz';
import { Routes } from '@/constants/routes';

type AnswerState = 'unanswered' | 'True' | 'False';

export default function QuizScreen() {
  // Inline object type required — named interfaces break Expo Router's overload resolution.
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();
  // Guard against empty string or NaN from malformed navigation.
  const parsed = Number(categoryId);
  const numericCategoryId = categoryId !== undefined && !Number.isNaN(parsed) ? parsed : undefined;

  const { questions, loading, error, refetch } = useTriviaQuestions({
    amount: TOTAL_QUESTIONS,
    categoryId: numericCategoryId,
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState<AnswerState>('unanswered');

  // Refs prevent stale closures when the timer fires and calls submitAnswer.
  const scoreRef    = useRef(0);
  const answeredRef = useRef(false);

  const { timeLeft, barProgress } = useQuizTimer(TIMER_DURATION, questionIndex);
  const question = questions[questionIndex];

  // Auto-submit when the timer reaches zero.
  useEffect(() => {
    if (timeLeft === 0 && !answeredRef.current) submitAnswer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const submitAnswer = useCallback(
    (choice: 'True' | 'False' | null) => {
      if (answeredRef.current || question === undefined) return;
      answeredRef.current = true;

      if (choice !== null && choice === question.correct_answer) {
        // Bonus is proportional to how much time remains.
        const bonus = Math.round((timeLeft / TIMER_DURATION) * MAX_BONUS);
        scoreRef.current += BASE_POINTS + bonus;
      }

      setAnswered(choice ?? 'unanswered');

      // Brief pause so the user can see the colour feedback before advancing.
      setTimeout(() => {
        answeredRef.current = false;
        setAnswered('unanswered');

        if (questionIndex + 1 >= TOTAL_QUESTIONS) {
          router.replace({
            pathname: Routes.quizResult,
            params: {
              score: String(scoreRef.current),
              categoryId: categoryId ?? '',
              categoryName: categoryName ?? '',
            },
          });
        } else {
          setQuestionIndex((i) => i + 1);
        }
      }, 700);
    },
    [question, questionIndex, timeLeft, categoryId, categoryName],
  );

  // Keep ScreenWrapper mounted for all states so the gradient is always visible.
  if (loading) return <ScreenWrapper><LoadingSpinner variant="light" /></ScreenWrapper>;
  if (error !== null) {
    return (
      <ScreenWrapper>
        <View style={quizStyles.errorContainer}>
          <ErrorMessage message={error} />
          <View style={quizStyles.errorButton}>
            <Button label="Try again" onPress={refetch} variant="outline" />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
  if (question === undefined) return null;

  const isAnswered = answered !== 'unanswered';
  const correct    = question.correct_answer;

  const btnStyle = (option: 'True' | 'False') => {
    if (!isAnswered) return quizStyles.answerBtn;
    if (option === correct)   return [quizStyles.answerBtn, quizStyles.correctBtn];
    if (option === answered)  return [quizStyles.answerBtn, quizStyles.wrongBtn];
    return [quizStyles.answerBtn, quizStyles.neutralAnsweredBtn];
  };

  return (
    <ScreenWrapper>
      {/* Transparent back button floats over the gradient */}
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: colors.surface,
        headerBackTitle: 'Back',
      }} />

      <View style={quizStyles.header}>
        <Text style={quizStyles.categoryLabel} numberOfLines={1}>
          {categoryName ?? 'Quiz'}
        </Text>
        <Text style={quizStyles.scoreLabel}>
          {scoreRef.current} / {MAX_SCORE}
        </Text>
      </View>

      <View style={quizStyles.timerRow}>
        <Text style={quizStyles.metaText}>Q {questionIndex + 1} / {TOTAL_QUESTIONS}</Text>
        <Text style={quizStyles.metaText}>{timeLeft}s</Text>
      </View>
      <View style={quizStyles.progressBarWrap}>
        <ProgressBar
          progress={barProgress}
          fillColor={timeLeft <= 5 ? colors.error : colors.surface}
          trackColor="rgba(255,255,255,0.3)"
        />
      </View>

      <View style={quizStyles.cardWrap}>
        <QuestionCard question={question} />
      </View>

      <View style={quizStyles.answersRow}>
        {(['True', 'False'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={btnStyle(option)}
            onPress={() => submitAnswer(option)}
            disabled={isAnswered}
            accessibilityRole="button"
          >
            <Text style={quizStyles.answerIcon}>{option === 'True' ? '✓' : '✗'}</Text>
            <Text style={quizStyles.answerLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuizGame } from '@/features/quiz/hooks';
import { TOTAL_QUESTIONS, TIMER_WARNING_THRESHOLD } from '@/features/quiz';
import { useHighScore } from '@/features/highscore/hooks';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  ProgressBar,
  ScreenWrapper,
} from '@/components/ui';
import { QuizQuestionCard, QuizResultView } from '@/features/quiz/components';
import { quizStyles, colors } from '@/theme';

export default function QuizScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();
  const {
    questions,
    loading,
    error,
    questionIndex,
    score,
    isCompleted,
    timeLeft,
    barProgress,
    isAnswered,
    selectedAnswer,
    submitAnswer,
    startQuiz,
    refetchQuestions,
  } = useQuizGame();

  const { save, isTopFive, loading: savingScore } = useHighScore();
  const [showModal, setShowModal] = useState(false);
  const [hasCheckedTopFive, setHasCheckedTopFive] = useState(false);

  useEffect(() => {
    startQuiz(Number(categoryId));
  }, [categoryId, startQuiz]);

  useEffect(() => {
    if (isCompleted && !hasCheckedTopFive) {
      setHasCheckedTopFive(true);
      isTopFive(score).then((inTop) => {
        if (inTop) {
          setShowModal(true);
        } else {
          save({
            categoryId: categoryId || '0',
            categoryName: categoryName || 'Quiz',
            score,
            username: 'Anonymous',
          });
        }
      });
    }
  }, [
    isCompleted,
    hasCheckedTopFive,
    score,
    categoryId,
    categoryName,
    isTopFive,
    save,
  ]);

  const handleSave = useCallback(
    async (name: string) => {
      await save({
        categoryId: categoryId || '0',
        categoryName: categoryName || 'Quiz',
        score,
        username: name,
      });
      setShowModal(false);
    },
    [categoryId, categoryName, score, save],
  );

  const handleRetry = useCallback(() => {
    setHasCheckedTopFive(false);
    setShowModal(false);
    refetchQuestions();
  }, [refetchQuestions]);

  if (error)
    return (
      <ScreenWrapper>
        <View style={quizStyles.screenContainer}>
          <ErrorMessage message={error} />
          <Button label="Retry" onPress={handleRetry} variant="secondary" />
        </View>
      </ScreenWrapper>
    );

  if (loading && questions.length === 0)
    return (
      <ScreenWrapper>
        <LoadingSpinner variant="light" />
      </ScreenWrapper>
    );

  if (isCompleted)
    return (
      <ScreenWrapper>
        <QuizResultView
          score={score}
          showModal={showModal}
          onSave={handleSave}
          loading={savingScore}
        />
      </ScreenWrapper>
    );

  if (questions.length > 0 && questionIndex < questions.length) {
    const question = questions[questionIndex];

    return (
      <ScreenWrapper>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: colors.surface,
          }}
        />

        <View style={quizStyles.screenContainer}>
          <View>
            <View style={quizStyles.headerRow}>
              <Text style={quizStyles.metaText}>{categoryName || 'Quiz'}</Text>
              <Text style={quizStyles.metaText}>Score: {score}</Text>
            </View>

            <View style={quizStyles.timerSection}>
              <View style={quizStyles.timerRow}>
                <Text style={quizStyles.metaText}>
                  Question {questionIndex + 1}/{TOTAL_QUESTIONS}
                </Text>
                <Text style={quizStyles.metaText}>{timeLeft}s</Text>
              </View>
              <ProgressBar
                progress={barProgress}
                fillColor={
                  timeLeft <= TIMER_WARNING_THRESHOLD
                    ? colors.error
                    : colors.surface
                }
                trackColor={colors.overlayMedium}
              />
            </View>
          </View>

          <View style={quizStyles.questionContainer}>
            <QuizQuestionCard question={question} />
          </View>

          <View style={quizStyles.answerButtonsContainer}>
            <View style={quizStyles.answerRow}>
              {(['True', 'False'] as const).map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    quizStyles.btn,
                    isAnswered &&
                      opt === questions[questionIndex]?.correct_answer &&
                      quizStyles.correct,
                    isAnswered &&
                      opt === selectedAnswer &&
                      opt !== questions[questionIndex]?.correct_answer &&
                      quizStyles.wrong,
                  ]}
                  onPress={() => submitAnswer(opt)}
                  disabled={isAnswered}
                  activeOpacity={isAnswered ? 1 : 0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`Answer: ${opt}`}
                  accessibilityState={{ disabled: isAnswered }}
                >
                  <Text style={[quizStyles.btnText, quizStyles.btnSymbol]}>
                    {opt === 'True' ? '✓' : '✗'}
                  </Text>
                  <Text style={quizStyles.metaText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <LoadingSpinner variant="light" />
    </ScreenWrapper>
  );
}

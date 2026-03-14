import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuizGame } from '@/features/quiz/hooks'; // Main quiz/game logic
import { useHighScore } from '@/features/highscore/hooks'; // Handles highscore save/check
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  ScreenWrapper,
} from '@/components/ui';
import { QuizQuestionCard, QuizResultView } from '@/features/quiz/components';
import { quizStyles } from '@/theme';

// Only business logic state here!
export default function QuizScreen() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  // Main quiz/game state from custom hook
  const {
    questions,
    loading,
    error,
    questionIndex,
    score,
    isCompleted,
    timeLeft,
    isAnswered,
    selectedAnswer,
    submitAnswer,
    refetchQuestions,
    startQuiz,
  } = useQuizGame();

  // Highscore checks and save methods (from Firebase logic)
  const { save, isTopFive, loading: savingScore } = useHighScore();

  // Local state: for showing modal & tracking if we checked top score
  const [showModal, setShowModal] = useState(false);
  const [hasCheckedTopFive, setHasCheckedTopFive] = useState(false);

  useEffect(() => {
    startQuiz(categoryId ? Number(categoryId) : undefined);
  }, [categoryId, startQuiz]);

  // This effect runs only when quiz is finished.
  useEffect(() => {
    if (isCompleted && !hasCheckedTopFive) {
      setHasCheckedTopFive(true);
      isTopFive(score).then((inTop) => {
        if (inTop) {
          setShowModal(true);
        } else {
          save({
            categoryId: '0',
            categoryName: 'Quiz',
            score,
            username: 'Anonymous',
          });
        }
      });
    }
  }, [isCompleted, hasCheckedTopFive, score, isTopFive, save]);

  // Callback after saving with username. Modal closes after save.
  async function handleSave(name: string) {
    await save({
      categoryId: '0',
      categoryName: 'Quiz',
      score,
      username: name,
    });
    setShowModal(false);
  }

  // Called when retrying the quiz: resets score, modal state, and game state
  function handleRetry() {
    setHasCheckedTopFive(false);
    setShowModal(false);
    refetchQuestions();
  }

  // Show error if quiz can't load
  if (error)
    return (
      <ScreenWrapper>
        <View style={quizStyles.screenContainer}>
          <ErrorMessage message={error} />
          <Button label="Retry" onPress={handleRetry} variant="secondary" />
        </View>
      </ScreenWrapper>
    );

  // Show loading spinner at app start
  if (loading && questions.length === 0)
    return (
      <ScreenWrapper>
        <LoadingSpinner variant="light" />
      </ScreenWrapper>
    );

  // If finished, show result and modal
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

  // Question UI render (main quiz flow)
  if (questions.length > 0 && questionIndex < questions.length) {
    const question = questions[questionIndex];
    return (
      <ScreenWrapper>
        <View style={quizStyles.screenContainer}>
          {/* Quiz category & score */}
          <View style={quizStyles.headerRow}>
            <Text style={quizStyles.metaText}>Quiz</Text>
            <Text style={quizStyles.metaText}>Score: {score}</Text>
          </View>
          {/* Timer info */}
          <View style={quizStyles.timerSection}>
            <View style={quizStyles.timerRow}>
              <Text style={quizStyles.metaText}>
                Question {questionIndex + 1}/{questions.length}
              </Text>
              <Text style={quizStyles.metaText}>{timeLeft}s</Text>
            </View>
          </View>
          {/* The card shows question */}
          <QuizQuestionCard question={question} />
          {/* Answer buttons */}
          <View style={quizStyles.answerRow}>
            {(['True', 'False'] as const).map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  quizStyles.btn,
                  isAnswered && opt === question.correct_answer
                    ? quizStyles.correct
                    : null,
                  isAnswered &&
                  opt === selectedAnswer &&
                  opt !== question.correct_answer
                    ? quizStyles.wrong
                    : null,
                ]}
                onPress={() => submitAnswer(opt)}
                disabled={isAnswered}
                accessibilityLabel={`Answer: ${opt}`}
              >
                <Text style={[quizStyles.btnText, quizStyles.btnSymbol]}>
                  {opt === 'True' ? '✓' : '✗'}
                </Text>
                <Text style={quizStyles.metaText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  // Rare fallback: loading spinner
  return (
    <ScreenWrapper>
      <LoadingSpinner variant="light" />
    </ScreenWrapper>
  );
}

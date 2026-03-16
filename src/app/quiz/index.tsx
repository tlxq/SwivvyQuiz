import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuizGame, ResultView, QuestionCard } from '@/features/quiz';
import { useHighScoreFlow } from '@/features/highscore';
import {
  LoadingSpinner,
  ErrorMessage,
  ProgressBar,
  Button,
} from '@/components/ui';
import { theme } from '@/theme';

export default function QuizScreen() {
  const { categoryName, categoryId } = useLocalSearchParams<{
    categoryName: string;
    categoryId: string;
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
    resetQuiz,
  } = useQuizGame(categoryId ? Number(categoryId) : undefined);

  const {
    showModal,
    handleSave,
    loading: saving,
  } = useHighScoreFlow({
    score,
    isCompleted,
    categoryId: Number(categoryId),
    categoryName: categoryName || 'Trivia',
  });

  if (loading && questions.length === 0) return <LoadingSpinner />;
  if (error)
    return (
      <View style={theme.styles.container}>
        <ErrorMessage message={error} />
        <Button
          label="Retry"
          onPress={resetQuiz}
          style={theme.styles.spaceBelowXl}
        />
      </View>
    );

  if (isCompleted) {
    return (
      <ResultView
        score={score}
        showModal={showModal}
        onSave={handleSave}
        loading={saving}
      />
    );
  }

  const currentQuestion = questions[questionIndex];
  if (!currentQuestion) return null;

  return (
    <View style={theme.styles.container}>
      {/* HEADER: Progress and Score */}
      <View style={theme.styles.rowSpread}>
        <Text style={theme.typography.caption}>{categoryName}</Text>
        <Text style={theme.typography.caption}>Score: {score}</Text>
      </View>

      <ProgressBar progress={barProgress} />

      {/* MIDDLE SECTION: Question Card */}
      <ScrollView
        contentContainerStyle={theme.styles.quizScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard question={currentQuestion} />
      </ScrollView>

      {/* BOTTOM SECTION: Timer and Answers */}
      <View style={theme.styles.timerBlock}>
        <Text style={theme.styles.timerText}>Time Left: {timeLeft}s</Text>
        <View style={theme.styles.answerRow}>
          {(['True', 'False'] as const).map((choice) => {
            const isCorrect = choice === currentQuestion.correct_answer;
            const isSelected = choice === selectedAnswer;

            // style feedback for answers (theme-colors only)
            let feedbackStyle = {};
            if (isAnswered) {
              if (isCorrect) {
                feedbackStyle = {
                  backgroundColor: theme.colors.success,
                  borderColor: theme.colors.success,
                };
              } else if (isSelected) {
                feedbackStyle = {
                  backgroundColor: theme.colors.error,
                  borderColor: theme.colors.error,
                };
              }
            }

            const textStyle =
              isAnswered && (isCorrect || isSelected)
                ? { color: theme.colors.surface }
                : {};

            return (
              <Button
                key={choice}
                label={choice}
                onPress={() => submitAnswer(choice)}
                disabled={isAnswered}
                style={[theme.styles.answerButton, feedbackStyle]}
                labelStyle={textStyle}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

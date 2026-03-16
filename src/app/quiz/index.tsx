import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuizGame, ResultView, QuestionCard } from '@/features/quiz';
import { useHighScoreFlow } from '@/features/highscore';
import { LoadingSpinner, ErrorMessage, ProgressBar } from '@/components/ui';
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

  // Loading and Error states
  if (loading && questions.length === 0) return <LoadingSpinner />;
  if (error)
    return (
      <View style={theme.styles.container}>
        <ErrorMessage message={error} />
        <Pressable
          style={[theme.styles.button, { marginTop: theme.spacing.lg }]}
          onPress={resetQuiz}
        >
          <Text style={theme.styles.buttonText}>Retry</Text>
        </Pressable>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}
      >
        <Text
          style={[
            theme.typography.caption,
            { textTransform: 'uppercase', color: theme.colors.textSecondary },
          ]}
        >
          {categoryName}
        </Text>
        <Text
          style={[
            theme.typography.caption,
            { textTransform: 'uppercase', color: theme.colors.textSecondary },
          ]}
        >
          Score: {score}
        </Text>
      </View>

      <ProgressBar progress={barProgress} />

      {/* MIDDLE SECTION: Question Card */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingVertical: theme.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard question={currentQuestion} />
      </ScrollView>

      {/* BOTTOM SECTION: Timer and Answers */}
      <View style={{ gap: theme.spacing.md, paddingTop: theme.spacing.lg }}>
        <Text
          style={[
            theme.typography.bodyBold,
            {
              textAlign: 'center',
              color: theme.colors.primary,
              marginBottom: theme.spacing.sm,
            },
          ]}
        >
          Time Left: {timeLeft}s
        </Text>
        <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
          {(['True', 'False'] as const).map((choice) => {
            const isCorrect = choice === currentQuestion.correct_answer;
            const isSelected = choice === selectedAnswer;

            // style feedback
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
              <Pressable
                key={choice}
                style={[
                  theme.styles.button,
                  theme.styles.answerButton,
                  feedbackStyle,
                ]}
                onPress={() => submitAnswer(choice)}
                disabled={isAnswered}
              >
                <Text style={[theme.styles.buttonText, textStyle]}>
                  {choice}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

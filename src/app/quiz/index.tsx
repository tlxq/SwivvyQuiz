import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuizGame, ResultView, QuestionCard } from '@/features/quiz';
import { useHighScoreFlow } from '@/features/highscore';
import { ScreenWrapper, LoadingSpinner, ErrorMessage, ProgressBar } from '@/components/ui';
import { quizStyles, sharedStyles } from '@/theme';

/**
 * QuizScreen - Core gameplay experience.
 */
export default function QuizScreen() {
  const { categoryName, categoryId } = useLocalSearchParams<{ categoryName: string; categoryId: string }>();
  
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

  const { showModal, handleSave, loading: saving } = useHighScoreFlow({
    score,
    isCompleted,
    categoryId: Number(categoryId),
    categoryName: categoryName || 'Trivia',
  });

  // Loading and Error states
  if (loading && questions.length === 0) return <ScreenWrapper><LoadingSpinner /></ScreenWrapper>;
  if (error) return (
    <ScreenWrapper>
      <View style={sharedStyles.container}>
        <ErrorMessage message={error} />
        <TouchableOpacity style={quizStyles.btn} onPress={resetQuiz}>
          <Text style={quizStyles.btnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );

  if (isCompleted) {
    return (
      <ScreenWrapper>
        <ResultView 
          score={score} 
          showModal={showModal} 
          onSave={handleSave} 
          loading={saving}
        />
      </ScreenWrapper>
    );
  }

  const currentQuestion = questions[questionIndex];
  if (!currentQuestion) return null;

  return (
    <ScreenWrapper>
      <View style={quizStyles.screenContainer || sharedStyles.container}>
        
        {/* HEADER: Progress and Score */}
        <View style={quizStyles.headerRow}>
          <Text style={quizStyles.headerLabel}>{categoryName}</Text>
          <Text style={quizStyles.headerLabel}>Score: {score}</Text>
        </View>

        <ProgressBar progress={barProgress} />

        {/* MIDDLE SECTION: Question Card */}
        <ScrollView 
          contentContainerStyle={quizStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <QuestionCard question={currentQuestion} />
        </ScrollView>

        {/* BOTTOM SECTION: Timer and Answers */}
        <View style={quizStyles.bottomControls}>
          <Text style={quizStyles.timerText}>
            Time Left: {timeLeft}s
          </Text>

          <View style={quizStyles.answerRow}>
            {(['True', 'False'] as const).map((choice) => {
              const isCorrect = choice === currentQuestion.correct_answer;
              const isSelected = choice === selectedAnswer;
              
              const feedbackStyle = isAnswered 
                ? (isCorrect ? quizStyles.correct : (isSelected ? quizStyles.wrong : null))
                : null;

              const textStyle = isAnswered && (isCorrect || isSelected) 
                ? { color: '#FFF' } 
                : {};

              return (
                <TouchableOpacity
                  key={choice}
                  style={[quizStyles.btn, feedbackStyle]}
                  onPress={() => submitAnswer(choice)}
                  disabled={isAnswered}
                  activeOpacity={0.8}
                >
                  <Text style={[quizStyles.btnText, textStyle]}>{choice}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </View>
    </ScreenWrapper>
  );
}

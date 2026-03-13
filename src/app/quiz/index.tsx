import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuiz, useFirebaseHighScore } from '@/hooks';
import { LoadingSpinner, ErrorMessage, ProgressBar, ScreenWrapper } from '@/components/ui';
import { QuestionCard, ResultView } from '@/components/quiz';
import { quizStyles } from '@/styles/screens';
import { colors } from '@/styles/colors';
import { TOTAL_QUESTIONS } from '@/constants/quiz';

export default function QuizScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{ categoryId?: string; categoryName?: string; }>();
  const { 
    questions, loading, error, questionIndex, score, isCompleted, 
    timeLeft, barProgress, isAnswered, selectedAnswer, submitAnswer, startQuiz, refetchQuestions 
  } = useQuiz();

  const { save, isTopFive } = useFirebaseHighScore();
  const [showModal, setShowModal] = useState(false);
  const [hasCheckedTopFive, setHasCheckedTopFive] = useState(false);

  useEffect(() => { startQuiz(Number(categoryId)); }, [categoryId]);

  useEffect(() => {
    if (isCompleted && !hasCheckedTopFive) {
      setHasCheckedTopFive(true);
      isTopFive(score).then(inTop => {
        if (inTop) setShowModal(true);
        else save({ categoryId: categoryId || '0', categoryName: categoryName || 'Quiz', score, username: 'Anonymous' });
      });
    }
  }, [isCompleted, hasCheckedTopFive, score]);

  const handleSave = (name: string) => {
    setShowModal(false);
    save({ categoryId: categoryId || '0', categoryName: categoryName || 'Quiz', score, username: name });
  };

  if (error) return (
    <ScreenWrapper>
      <View style={quizStyles.screenContainer}>
        <ErrorMessage message={error} />
        <TouchableOpacity 
          onPress={refetchQuestions} 
          style={quizStyles.retryButton}
        >
          <Text style={quizStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );

  if (loading && questions.length === 0) return <ScreenWrapper><LoadingSpinner variant="light" /></ScreenWrapper>;

  if (isCompleted) return (
    <ScreenWrapper>
      <ResultView score={score} showModal={showModal} onSave={handleSave} />
    </ScreenWrapper>
  );

  if (questions.length > 0 && questionIndex < questions.length) {
    const question = questions[questionIndex];
    const getBtnStyle = (option: 'True' | 'False') => [
      quizStyles.btn,
      isAnswered && option === question.correct_answer && quizStyles.correct,
      isAnswered && option === selectedAnswer && option !== question.correct_answer && quizStyles.wrong,
    ];

    return (
      <ScreenWrapper>
        <Stack.Screen options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerTintColor: colors.surface }} />
        
        <View style={quizStyles.screenContainer}>
          <View>
            <View style={quizStyles.headerRow}>
              <Text style={quizStyles.metaText}>{categoryName || 'Quiz'}</Text>
              <Text style={quizStyles.metaText}>Score: {score}</Text>
            </View>

            <View style={quizStyles.timerSection}>
              <View style={quizStyles.timerRow}>
                <Text style={quizStyles.metaText}>Question {questionIndex + 1}/{TOTAL_QUESTIONS}</Text>
                <Text style={quizStyles.metaText}>{timeLeft}s</Text>
              </View>
              <ProgressBar 
                progress={barProgress} 
                fillColor={timeLeft <= 5 ? colors.error : colors.surface} 
                trackColor="rgba(255,255,255,0.2)" 
              />
            </View>
          </View>

          <View style={quizStyles.questionContainer}>
            <QuestionCard question={question} />
          </View>

          <View style={quizStyles.answerButtonsContainer}>
            <View style={quizStyles.answerRow}>
              {(['True', 'False'] as const).map(opt => (
                <TouchableOpacity 
                  key={opt} 
                  style={getBtnStyle(opt)} 
                  onPress={() => submitAnswer(opt)} 
                  disabled={isAnswered}
                  activeOpacity={isAnswered ? 1 : 0.7}
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

  return <ScreenWrapper><LoadingSpinner variant="light" /></ScreenWrapper>;
}

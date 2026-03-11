import { View, Text } from 'react-native';
import { useTriviaQuestions } from '@/hooks/useTriviaQuestions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { quizStyles } from '@/styles/screens/quizStyles';

export default function QuizScreen() {
  const { questions, loading, error } = useTriviaQuestions(10);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View style={quizStyles.container}>
      <Text style={quizStyles.placeholder}>
        {questions.length} questions loaded. Swipe UI goes here.
      </Text>
    </View>
  );
}

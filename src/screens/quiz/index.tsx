import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTriviaQuestions } from '@/hooks/useTriviaQuestions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { quizStyles } from '@/styles/screens/quizStyles';

export default function QuizScreen() {
  // Params arrive when the user chose a category on the Home screen.
  // If they tap the Quiz tab directly, both are undefined — the hook
  // falls back to a random mix across all categories in that case.
  //
  // Note: Expo Router's useLocalSearchParams overload resolution requires an
  // inline object type here; named interfaces trigger a constraint mismatch.
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
  }>();
  const numericCategoryId = categoryId !== undefined ? Number(categoryId) : undefined;

  const { questions, loading, error } = useTriviaQuestions({
    amount: 10,
    categoryId: numericCategoryId,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View style={quizStyles.container}>
      {/* Show the chosen category name when available */}
      {categoryName !== undefined && (
        <Text style={quizStyles.category}>{categoryName}</Text>
      )}
      <Text style={quizStyles.placeholder}>
        {questions.length} questions loaded. Swipe UI goes here.
      </Text>
    </View>
  );
}

import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import type { TriviaQuestion } from '@/types/trivia';

interface QuestionCardProps {
  question: TriviaQuestion;
  index: number;
  total: number;
}

// Placeholder — implement swipe gesture and card UI here
export function QuestionCard({ question, index, total }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.counter}>
        {index + 1} / {total}
      </Text>
      <Text style={styles.question}>{question.question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  counter: {
    ...typography.caption,
  },
  question: {
    ...typography.h2,
    textAlign: 'center',
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import type { TriviaQuestion } from '@/types/trivia';

interface QuestionCardProps {
  question: TriviaQuestion;
  index: number;  // 0-based; displayed as "1 / 10" style progress
  total: number;
}

// Placeholder card — swipe gestures and answer selection will be layered on top
// of this once the quiz interaction is built out.
export function QuestionCard({ question, index, total }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.counter}>{index + 1} / {total}</Text>
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

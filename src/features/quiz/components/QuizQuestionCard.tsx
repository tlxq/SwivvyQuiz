import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import type { TriviaQuestion } from '../quiz.types';

interface QuestionCardProps {
  question: TriviaQuestion;
  // index and total are removed — progress is shown in the parent quiz screen header
}

// Pure display card. Answer buttons live in the quiz screen so they can
// access the timer state and trigger score calculation directly.
// Wrapped in React.memo to prevent unnecessary re-renders when parent updates
// but question object hasn't changed.
function QuestionCardComponent({ question }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.difficulty}>{question.difficulty.toUpperCase()}</Text>
      <Text style={styles.question}>{question.question}</Text>
    </View>
  );
}

export default React.memo(QuestionCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    // Elevation lifts the card visually above the gradient background
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  difficulty: {
    ...typography.caption,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  question: {
    ...typography.h2,
    textAlign: 'center',
    lineHeight: 34,
  },
});

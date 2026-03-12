import { StyleSheet } from 'react-native';
import { centeredScreen } from './shared';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export const quizStyles = StyleSheet.create({
  container: centeredScreen,

  // Shown at the top when the user navigated from the Home category picker
  category: {
    ...typography.h2,
    marginBottom: spacing.md,
  },

  // Temporary placeholder — will be replaced with the QuestionCard swipe UI
  placeholder: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

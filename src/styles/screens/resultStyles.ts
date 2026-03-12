import { StyleSheet } from 'react-native';
import { centeredScreen } from './shared';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export const resultStyles = StyleSheet.create({
  container: centeredScreen,
  title: {
    ...typography.h1,
    marginBottom: spacing.md,
  },
  // Score stands out in brand colour to make it feel like a reward
  score: {
    ...typography.h2,
    color: colors.primary,
  },
});

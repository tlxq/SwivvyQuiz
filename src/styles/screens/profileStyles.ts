import { StyleSheet } from 'react-native';
import { centeredScreen } from './shared';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export const profileStyles = StyleSheet.create({
  container: centeredScreen,
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

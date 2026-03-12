import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

// Result screen also uses a full gradient, so no centeredScreen base here.
export const resultStyles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  trophy: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.surface,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  // Large score number — bigger than h1 to make it the visual focus
  scoreValue: {
    fontSize: 72,
    fontWeight: '700',
    color: colors.surface,
    lineHeight: 80,
  },
  maxScore: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xl,
  },

  buttons: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});

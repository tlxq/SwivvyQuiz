import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export const homeStyles = StyleSheet.create({
  // Applied directly to LinearGradient — flex:1 fills the screen
  container: {
    flex: 1,
  },

  // Centred content panel used for the splash animation
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  emoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },

  // Override typography.h1's dark color — text must be white on the gradient
  title: {
    ...typography.h1,
    color: colors.surface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    // Slightly transparent white feels softer than solid white on the gradient
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  buttonContainer: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
});

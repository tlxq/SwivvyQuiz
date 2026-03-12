import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

// Home has a gradient background rather than colors.background, and two distinct
// layout phases (centred splash + scrollable category list), so it gets its own
// custom style set instead of using centeredScreen from shared.ts.
export const homeStyles = StyleSheet.create({
  // Applied directly to LinearGradient — no alignment here; each phase owns its own
  container: {
    flex: 1,
  },

  // Centred panel: splash, loading indicator, and error state all use this
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  // ScrollView wrapper for the category list phase
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },

  emoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },

  // Override typography.h1's dark color — needs to be white on the gradient
  title: {
    ...typography.h1,
    color: colors.surface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    // Slightly transparent white feels softer than a solid white on the gradient
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },

  buttonContainer: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
});

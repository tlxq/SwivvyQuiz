import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

export const gameStyles = StyleSheet.create({
  // No background — ScreenWrapper's gradient shows through.
  container: {
    flex: 1,
  },

  // Glass-style header: dark overlay so content is readable on any gradient angle.
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  title: {
    ...typography.h1,
    color: colors.surface,
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
  },

  // Scrollable body area between header and footer — transparent so gradient shows.
  body: {
    flex: 1,
    padding: spacing.lg,
  },

  // ── Footer ───────────────────────────────────────────────────────────────

  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});

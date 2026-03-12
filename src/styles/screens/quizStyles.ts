import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

// Quiz screen has a full-screen gradient, so there's no centeredScreen here.
export const quizStyles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    // Extra top padding accounts for the transparent navigation header sitting above
    paddingTop: spacing.xxl + spacing.lg,
    paddingBottom: spacing.md,
  },
  categoryLabel: {
    ...typography.h2,
    color: colors.surface,
    flex: 1,
    marginRight: spacing.md,
  },
  scoreLabel: {
    ...typography.body,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },

  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs,
  },
  metaText: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  progressBarWrap: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },

  cardWrap: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },

  answersRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  // Default answer button — semi-transparent white on the gradient
  answerBtn: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  // Applied to the correct answer after the user has answered
  correctBtn: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  // Applied to the button the user tapped when it was wrong
  wrongBtn: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  // Applied to the unchosen wrong option — faded so correct answer stands out
  neutralAnsweredBtn: {
    opacity: 0.35,
  },
  answerIcon: {
    fontSize: 26,
    color: colors.surface,
  },
  answerLabel: {
    ...typography.body,
    fontWeight: '700',
    color: colors.surface,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorButton: {
    width: '80%',
    marginTop: spacing.md,
  },
});

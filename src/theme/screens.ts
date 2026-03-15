import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { cardStyles } from './componentStyle';

/**
 * Shared Layout Styles
 */
export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: spacing.xxl,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
  },
});

/**
 * Quiz Feature Styles
 */
export const quizStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  timerText: {
    ...typography.bodyBold,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  questionCard: {
    ...cardStyles.base,
  },
  questionDifficulty: {
    ...typography.tiny,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  questionText: {
    ...typography.h2,
    lineHeight: 34,
  },
  bottomControls: {
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  answerRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  btn: {
    flex: 1,
    height: 64,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnText: {
    ...typography.h3,
    color: colors.text,
  },
  correct: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  wrong: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
});

/**
 * Result View Styles
 */
export const resultStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  contentCenter: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophy: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  score: {
    ...typography.h1,
    fontSize: 64,
    lineHeight: 72,
    color: colors.primary,
  },
  scoreLabel: {
    ...typography.subtitle,
    marginBottom: spacing.xxl,
  },
  buttonGroup: {
    width: '100%',
    gap: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  modalTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    padding: spacing.md,
    color: colors.text,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flexBtn: {
    flex: 1,
  },
});

/**
 * Highscore Feature Styles
 */
export const highscoreStyles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rank: {
    ...typography.h3,
    width: 40,
    color: colors.secondary,
  },
  name: {
    ...typography.bodyBold,
    flex: 1,
  },
  score: {
    ...typography.h3,
    color: colors.primary,
  },
});

/**
 * Welcome Screen Styles
 */
export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  categoryScroll: {
    width: '100%',
    marginVertical: spacing.lg,
  },
});

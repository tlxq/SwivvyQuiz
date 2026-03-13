import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.surface,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});

export const quizStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  metaText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  timerSection: {
    marginBottom: spacing.lg,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  questionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  answerButtonsContainer: {
    flexShrink: 1,
    paddingBottom: spacing.md,
  },
  answerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  btn: {
    flex: 1,
    height: 72,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    ...typography.h2,
    color: colors.surface,
  },
  btnSymbol: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  correct: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  wrong: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  retryButton: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
});

export const resultStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCenter: {
    width: '100%',
    alignItems: 'center',
  },
  trophy: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  score: {
    ...typography.h1,
    fontSize: 64,
    color: colors.surface,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.xxl,
  },
  buttonGroup: {
    width: '100%',
    gap: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  modalDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginVertical: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  inputPlaceholder: {
    color: colors.textSecondary,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  modalButtonSave: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonSaveText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '600',
  },
  modalButtonSkip: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonSkipText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
});

export const highscoreStyles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.md,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    ...typography.h2,
    color: colors.surface,
    opacity: 0.5,
  },
  textBlock: {
    flex: 1,
    marginLeft: spacing.sm + 4, // =12
  },
  name: {
    ...typography.body,
    color: colors.surface,
    fontWeight: 'bold',
  },
  category: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  score: {
    ...typography.h2,
    color: colors.surface,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.surface,
  },
});

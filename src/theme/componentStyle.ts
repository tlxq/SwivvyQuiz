import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const pickerStyles = StyleSheet.create({
  label: {
    ...typography.caption,
    marginBottom: spacing.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: spacing.sm,
  },
  pillText: {
    ...typography.body,
    flex: 1,
    color: colors.primary,
    fontWeight: '600',
  },
  dropdown: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.md,
    maxHeight: 320,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  itemSelected: {
    backgroundColor: `${colors.primary}10`,
  },
  itemText: {
    ...typography.body,
    flex: 1,
  },
  itemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});

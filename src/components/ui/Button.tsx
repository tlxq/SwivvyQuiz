import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';

interface ButtonProps {
  label: string;
  onPress: () => void;
  // primary  — filled indigo, default action
  // secondary — white fill with border, for use on light backgrounds
  // outline   — transparent with white border, for use on dark/gradient backgrounds
  variant?: 'primary' | 'secondary' | 'outline';
}

// Lookup table beats nested ternaries: adding a new variant is a single line here
const variantMap = {
  primary:   { button: 'primary',   label: 'labelPrimary'   },
  secondary: { button: 'secondary', label: 'labelSecondary' },
  outline:   { button: 'outline',   label: 'labelOutline'   },
} as const;

export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const { button, label: labelStyle } = variantMap[variant];
  return (
    <TouchableOpacity
      style={[styles.base, styles[button]]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      <Text style={[styles.label, styles[labelStyle]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
    // Shadow gives a lifted look on iOS; elevation does the same on Android
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  labelPrimary:   { color: colors.surface },
  labelSecondary: { color: colors.text },
  labelOutline:   { color: colors.surface },
});

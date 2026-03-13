import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  // primary  — filled indigo, default action
  // secondary — white fill with border, for use on light backgrounds
  // outline   — transparent with white border, for use on dark/gradient backgrounds
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Lookup table beats nested ternaries: adding a new variant is a single line here
const variantMap = {
  primary: {
    button: 'primary',
    label: 'labelPrimary',
    spinner: colors.surface,
  },
  secondary: {
    button: 'secondary',
    label: 'labelSecondary',
    spinner: colors.primary,
  },
  outline: {
    button: 'outline',
    label: 'labelOutline',
    spinner: colors.surface,
  },
} as const;

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { button, label: labelStyle, spinner } = variantMap[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[button],
        disabled && styles.disabled,
        loading && styles.loading,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={disabled || loading ? 1 : 0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={spinner} size="small" />
      ) : (
        <Text style={[styles.label, styles[labelStyle]]}>{label}</Text>
      )}
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
    minHeight: 52, // Ensure consistent height for loading state
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
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  disabled: {
    opacity: 0.5,
  },
  loading: {
    opacity: 0.8,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  labelPrimary: { color: colors.surface },
  labelSecondary: { color: colors.text },
  labelOutline: { color: colors.surface },
});

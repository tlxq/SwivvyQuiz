import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ButtonProps } from '@/types';
import { theme } from '@/theme';

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surfaceElevated;
    switch (variant) {
      case 'success':
        return theme.colors.success;
      case 'danger':
        return theme.colors.error;
      case 'surface':
        return theme.colors.surfaceElevated;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, { backgroundColor: getBackgroundColor() }, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  text: {
    ...theme.typography.bodyBold,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
});

import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { colors, buttonStyles } from '@/theme';
import { StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';

  const mode = isOutline ? 'outlined' : 'contained';

  // Primary: Blue BG, White Text
  // Secondary: Dark Grey BG, White Text
  // Outline: Transp BG, Blue Border, Blue Text

  const buttonColor = isSecondary
    ? colors.surfaceElevated
    : isOutline
      ? 'transparent'
      : colors.primary;
  const textColor = isOutline ? colors.primary : colors.text;

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled || loading}
      loading={loading}
      style={[
        buttonStyles.base,
        isOutline && buttonStyles.outline,
        disabled && buttonStyles.disabled,
        style,
      ]}
      contentStyle={buttonStyles.content}
      labelStyle={buttonStyles.label}
      buttonColor={buttonColor}
      textColor={textColor}
    >
      {label}
    </PaperButton>
  );
}

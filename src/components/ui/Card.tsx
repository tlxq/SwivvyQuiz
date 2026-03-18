import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { theme } from '@/theme';

/**
 * Card component with standard theme styling.
 * Supports custom style overrides.
 */
export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[theme.styles.card, style]}>{children}</View>;
}

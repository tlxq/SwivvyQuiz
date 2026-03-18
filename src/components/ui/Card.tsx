import React from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '@/theme';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[theme.styles.card, style]}>{children}</View>;
}

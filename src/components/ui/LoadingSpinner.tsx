import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

interface LoadingSpinnerProps {
  // 'light' uses white — readable on the dark gradient; 'default' uses brand indigo for light backgrounds.
  variant?: 'default' | 'light';
}

// Full-screen loading indicator — used in screens while async data is in flight.
// Wrapped in React.memo to skip re-renders when parent updates but variant stays same.
function LoadingSpinnerComponent({ variant = 'default' }: LoadingSpinnerProps) {
  const color = variant === 'light' ? colors.surface : colors.primary;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

export const LoadingSpinner = React.memo(LoadingSpinnerComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});

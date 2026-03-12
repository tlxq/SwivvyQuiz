import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

interface LoadingSpinnerProps {
  // 'light' uses white — readable on the dark gradient; 'default' uses brand indigo for light backgrounds.
  variant?: 'default' | 'light';
}

// Full-screen loading indicator — used in screens while async data is in flight.
export function LoadingSpinner({ variant = 'default' }: LoadingSpinnerProps) {
  const color = variant === 'light' ? colors.surface : colors.primary;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});

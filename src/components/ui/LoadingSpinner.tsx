import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

// Full-screen loading indicator — used in screens while async data is in flight.
// For loading states on a dark/gradient background, use ActivityIndicator directly
// with color={colors.surface} instead of this component.
export function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
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

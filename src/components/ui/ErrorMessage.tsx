import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface ErrorMessageProps {
  message: string;
}

// Full-screen error fallback — shown when a fetch fails and there is nothing
// else to render. Intentionally simple; the caller decides whether to add a retry.
// Wrapped in React.memo to skip re-renders when parent updates but message stays same.
function ErrorMessageComponent({ message }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.body, styles.text]}>{message}</Text>
    </View>
  );
}

export const ErrorMessage = React.memo(ErrorMessageComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  text: {
    color: colors.error,
    textAlign: 'center',
  },
});

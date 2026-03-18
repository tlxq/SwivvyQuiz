import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { ErrorDisplayProps } from '@/types';
import { Button } from './Button';
/**
 * A reusable component for displaying error states with a "Go Back" action.
 * Ensures consistent UI and DRY principle across the app.
 */
export const ErrorDisplay = React.memo(
  ({ message, onBack }: ErrorDisplayProps) => {
    return (
      <View style={theme.styles.centerScreen}>
        <Text style={[theme.typography.h3, styles.errorText]}>Oops!</Text>
        <Text style={[theme.typography.body, styles.messageText]}>
          {message}
        </Text>
        <Button
          label="Go Back"
          onPress={onBack}
          variant="primary"
          style={styles.button}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  messageText: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
  button: {
    width: '100%',
    maxWidth: 200,
  },
});

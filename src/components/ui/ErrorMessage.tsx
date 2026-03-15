import React from 'react';
import { View, Text } from 'react-native';
import { errorStyles } from '@/theme';

interface ErrorMessageProps {
  message: string;
}

/**
 * ErrorMessage - Custom component strictly using theme styles.
 * Displayed throughout the app for all caught errors.
 */
function ErrorMessageComponent({ message }: ErrorMessageProps) {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.text}>{message}</Text>
    </View>
  );
}

export const ErrorMessage = React.memo(ErrorMessageComponent);

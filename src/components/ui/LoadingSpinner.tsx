import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { colors, errorStyles } from '@/theme';

interface LoadingSpinnerProps {
  color?: string;
  size?: 'small' | 'large';
}

/**
 * LoadingSpinner - Themed activity indicator.
 */
export function LoadingSpinner({ 
  color = colors.primary, 
  size = 'large' 
}: LoadingSpinnerProps) {
  return (
    <View style={errorStyles.container}>
      <ActivityIndicator size={size} color={color} animating={true} />
    </View>
  );
}

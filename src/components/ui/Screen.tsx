import React from 'react';
import { View } from 'react-native';
import { theme } from '@/theme';
import { ScreenProps } from '@/types';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';

/**
 * Unified Screen wrapper that handles Loading and Error states centrally.
 * Reduces boilerplate in individual screen files.
 */
export const Screen = ({ loading, error, onBack, children }: ScreenProps) => (
  <View style={theme.styles.container}>
    {loading ? (
      <LoadingSpinner />
    ) : error ? (
      <ErrorDisplay message={error} onBack={onBack} />
    ) : (
      children
    )}
  </View>
);

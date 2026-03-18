import React from 'react';
import { View } from 'react-native';
import { theme } from '@/theme';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';

interface ScreenProps {
  loading: boolean;
  error: string | null;
  onBack: () => void;
  children: React.ReactNode;
}

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

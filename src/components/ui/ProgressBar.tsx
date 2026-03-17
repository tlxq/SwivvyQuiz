import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
  // progress should be 0 to 1
  return (
    <View style={theme.styles.progressBarTrack}>
      <View style={[theme.styles.progressBarFill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

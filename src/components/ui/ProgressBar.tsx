import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '@/theme';

interface ProgressBarProps {
  // An Animated.Value going from 1 (full) to 0 (empty) — pass the value from
  // useQuizTimer so the bar drains smoothly without triggering re-renders.
  progress: Animated.Value;
  height?: number;
  trackColor?: string;
  fillColor?: string;
}

// Width-based animation requires useNativeDriver: false, which is handled by
// the caller (useQuizTimer). This component just maps the value to a width %.
// Wrapped in React.memo to prevent re-renders from parent state changes.
function ProgressBarComponent({
  progress,
  height = 8,
  trackColor = colors.border,
  fillColor = colors.primary,
}: ProgressBarProps) {
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            backgroundColor: fillColor,
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

export const ProgressBar = React.memo(ProgressBarComponent);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
});

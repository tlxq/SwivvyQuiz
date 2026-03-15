import { View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { progressBarStyles } from '@/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

/**
 * ProgressBar - Animated progress bar for the quiz timer.
 */
export function ProgressBar({ progress }: ProgressBarProps) {
  const animatedProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [progress, animatedProgress]);

  const width = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={progressBarStyles.container}>
      <Animated.View style={[progressBarStyles.fill, { width }]} />
    </View>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseQuizTimerResult {
  timeLeft: number;          // Discrete countdown shown to the user
  barProgress: Animated.Value; // Smooth 1 → 0 value driving the progress bar
}

// Resets automatically when `questionKey` changes — just pass `questionIndex`.
// Runs both a discrete countdown (1 Hz) and a smooth Animated draining for the bar.
export function useQuizTimer(duration: number, questionKey: number): UseQuizTimerResult {
  const [timeLeft, setTimeLeft] = useState(duration);
  const barProgress = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    setTimeLeft(duration);
    barProgress.setValue(1);

    animRef.current?.stop();
    // Drain the bar smoothly over the full duration; can't use native driver
    // because we're animating width (a layout property).
    animRef.current = Animated.timing(barProgress, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    });
    animRef.current.start();

    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      animRef.current?.stop();
      clearInterval(interval);
    };
    // barProgress is a stable ref; intentionally omitted from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionKey, duration]);

  return { timeLeft, barProgress };
}

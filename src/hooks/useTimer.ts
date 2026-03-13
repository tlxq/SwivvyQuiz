import { useState, useEffect, useCallback, useRef } from 'react';
import { Animated } from 'react-native';

interface UseTimerProps {
  duration: number;
  onTimeUp: () => void;
  isEnabled?: boolean;
}

/**
 * useTimer - Reusable hook for countdown logic with Animated progress
 * 
 * Extracts animation and interval logic from the main quiz hook,
 * making it testable and reusable for any timed UI.
 */
export function useTimer({ duration, onTimeUp, isEnabled = true }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const barProgress = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
    barProgress.setValue(1);
    
    animRef.current?.stop();
    if (isEnabled) {
      animRef.current = Animated.timing(barProgress, {
        toValue: 0,
        duration: duration * 1000,
        useNativeDriver: false,
      });
      animRef.current.start();
    }
  }, [duration, isEnabled, barProgress]);

  useEffect(() => {
    if (!isEnabled) {
      animRef.current?.stop();
      return;
    }

    resetTimer();

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      animRef.current?.stop();
      clearInterval(interval);
    };
  }, [isEnabled, resetTimer, onTimeUp]);

  return { timeLeft, barProgress, resetTimer };
}

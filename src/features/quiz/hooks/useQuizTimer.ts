import { useState, useEffect, useCallback, useRef } from 'react';
import { Animated } from 'react-native';

interface UseTimerProps {
  duration: number;
  onTimeUp: () => void;
  isEnabled?: boolean;
}

export default function useQuizTimer({
  duration,
  onTimeUp,
  isEnabled = true,
}: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const barProgress = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

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
          onTimeUpRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      animRef.current?.stop();
      clearInterval(interval);
    };
  }, [isEnabled, resetTimer]);

  return { timeLeft, barProgress, resetTimer };
}

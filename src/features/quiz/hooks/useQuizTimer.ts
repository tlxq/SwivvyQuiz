import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerProps {
  duration: number;
  onTimeUp: () => void;
  isEnabled?: boolean;
}

/**
 * useQuizTimer - Manages the quiz countdown timer and numeric progress.
 */
export function useQuizTimer({
  duration,
  onTimeUp,
  isEnabled = true,
}: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [barProgress, setBarProgress] = useState(1);

  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
    setBarProgress(1);
  }, [duration]);

  useEffect(() => {
    if (!isEnabled) return;

    resetTimer();

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        const nextTime = t - 1;
        setBarProgress(nextTime / duration);
        return nextTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isEnabled, resetTimer, duration]);

  return { timeLeft, barProgress, resetTimer };
}

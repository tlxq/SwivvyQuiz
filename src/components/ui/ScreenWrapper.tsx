import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { BRAND_GRADIENT } from '@/styles/colors';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  // Override gradient direction per screen if needed; defaults work for most cases.
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

// Single source of truth for the screen background gradient.
// Every screen renders this instead of a plain View or their own LinearGradient,
// so the look is consistent app-wide and a palette change is a one-liner in colors.ts.
export function ScreenWrapper({
  children,
  style,
  start = { x: 0.2, y: 0 },
  end = { x: 0.8, y: 1 },
}: ScreenWrapperProps) {
  return (
    <LinearGradient
      colors={BRAND_GRADIENT}
      start={start}
      end={end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}

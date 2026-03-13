import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { BRAND_GRADIENT } from '@/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

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

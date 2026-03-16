import { View, StyleProp, ViewStyle, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenWrapperStyles } from '@/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  withSafeArea?: boolean;
}

/**
 * ScreenWrapper - A standardized container for all screens.
 * Ensures consistent background color and safe area handling.
 */
export function ScreenWrapper({
  children,
  style,
  safeAreaStyle,
  withSafeArea = true,
}: ScreenWrapperProps) {
  const Content = (
    <View style={[screenWrapperStyles.container, style]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );

  if (!withSafeArea) return Content;

  return (
    <SafeAreaView style={[screenWrapperStyles.safeArea, safeAreaStyle]}>
      {Content}
    </SafeAreaView>
  );
}

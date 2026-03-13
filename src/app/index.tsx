import { useRef, useEffect } from 'react';
import { Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { sharedStyles, welcomeStyles, ICONS } from '@/theme';
import { Button, ScreenWrapper, AppIcon } from '@/components/ui';
import { Routes } from '@/config';

export default function WelcomeScreen() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScreenWrapper>
      <Animated.View style={[welcomeStyles.container, { opacity }]}>
        <AppIcon icon={ICONS.brain} size={60} />
        <Text style={sharedStyles.title}>SwivvyQuiz</Text>
        <Text style={[sharedStyles.subtitle, welcomeStyles.subtitle]}>
          Test your knowledge across multiple categories
        </Text>
        <Button
          label="Get Started"
          onPress={() => router.replace(Routes.tabs)}
          variant="secondary"
        />
      </Animated.View>
    </ScreenWrapper>
  );
}

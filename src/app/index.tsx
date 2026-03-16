import { useRef, useEffect } from 'react';
import { Text, Animated, View } from 'react-native';
import { router } from 'expo-router';
import { sharedStyles, welcomeStyles, ICONS } from '@/theme';
import { Button, AppIcon } from '@/components/ui';
import { Routes } from '@/config';

export default function WelcomeScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const onGetStarted = () => router.replace(Routes.tabs);

  return (
    <Animated.View
      style={[
        welcomeStyles.container,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <View style={sharedStyles.header}>
        <AppIcon icon={ICONS.brain} size={80} />
        <Text style={sharedStyles.title}>SwivvyQuiz</Text>
        <Text style={sharedStyles.subtitle}>
          Test your knowledge across multiple categories with timed questions.
        </Text>
      </View>

      <View style={{ width: '100%', paddingHorizontal: 40 }}>
        <Button label="Get Started" onPress={onGetStarted} variant="primary" />
      </View>
    </Animated.View>
  );
}

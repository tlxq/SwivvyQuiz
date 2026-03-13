import { useRef, useEffect } from 'react';
import { Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { sharedStyles } from '@/styles/screens';
import { Button, ScreenWrapper } from '@/components/ui';
import { Routes } from '@/constants/routes';

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
      <Animated.View
        style={[
          sharedStyles.container,
          { opacity, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ fontSize: 80, marginBottom: 20 }}>🧠</Text>
        <Text style={sharedStyles.title}>SwivvyQuiz</Text>
        <Text style={[sharedStyles.subtitle, { marginBottom: 40 }]}>
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

import { useRef, useEffect, useCallback } from 'react';
import { View, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { homeStyles } from '@/styles/screens/homeStyles';
import { Button, ScreenWrapper } from '@/components/ui';
import { Routes } from '@/constants/routes';

// Pure welcome/splash screen — no data fetching here.
// Category selection happens on the Game tab after entering.
export default function WelcomeScreen() {
  const opacity    = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const animateIn = useCallback((): void => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => { animateIn(); }, [animateIn]);

  return (
    <ScreenWrapper>
      <Animated.View style={[homeStyles.content, { opacity, transform: [{ translateY }] }]}>
        <Text style={homeStyles.emoji}>🧠</Text>
        <Text style={homeStyles.title}>Welcome to SwivvyQuiz!</Text>
        <Text style={homeStyles.subtitle}>Test your knowledge across categories</Text>
        <View style={homeStyles.buttonContainer}>
          {/* replace so Back from the Game tab can't return to this splash */}
          <Button
            label="Enter SwivvyQuiz"
            onPress={() => router.replace(Routes.tabs)}
            variant="secondary"
          />
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
}

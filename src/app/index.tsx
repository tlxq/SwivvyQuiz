import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { AppIcon, Button } from '@/components/ui';

export default function WelcomeScreen() {
  const onGetStarted = () => router.replace('/(tabs)');

  return (
    <View style={theme.styles.centerScreen}>
      <View style={theme.styles.cardHeader}>
        <AppIcon icon={theme.icons.brain} size={80} />
        <Text style={theme.styles.h1ScreenTitle}>SwivvyQuiz</Text>
        <Text style={theme.styles.subtitleScreen}>
          Test your knowledge across multiple categories with timed questions.
        </Text>
      </View>
      <Button
        label="Get Started"
        onPress={onGetStarted}
        style={theme.styles.buttonFull}
      />
    </View>
  );
}

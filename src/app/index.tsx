import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { AppIcon, Button } from '@/components/ui';

export default function WelcomeScreen() {
  const onGetStarted = () => router.replace('/(tabs)');

  return (
    <View
      style={[
        theme.styles.container,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <View style={{ alignItems: 'center', marginBottom: theme.spacing.xxl }}>
        <AppIcon icon={theme.icons.brain} size={80} />
        <Text style={[theme.typography.h1, { marginTop: theme.spacing.lg }]}>
          SwivvyQuiz
        </Text>
        <Text
          style={[
            theme.typography.subtitle,
            { textAlign: 'center', marginTop: theme.spacing.md },
          ]}
        >
          Test your knowledge across multiple categories with timed questions.
        </Text>
      </View>

      <Button
        label="Get Started"
        onPress={onGetStarted}
        style={{ width: '100%', paddingHorizontal: theme.spacing.xl }}
      />
    </View>
  );
}

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { Button } from '@/components/ui';
import splashIcon from '@/assets/splash-icon.png';

export default function WelcomeScreen() {
  const onStart = () => router.replace('/(tabs)');

  return (
    <View style={theme.styles.centerScreen}>
      <Image source={splashIcon} style={styles.logo} />
      <Text
        style={[
          theme.typography.h1,
          { color: theme.colors.primary, marginBottom: theme.spacing.md },
        ]}
      >
        SwivvyQuiz
      </Text>
      <Text
        style={[
          theme.typography.subtitle,
          { textAlign: 'center', marginBottom: theme.spacing.xl },
        ]}
      >
        Test your knowledge - Better score if u are fast
      </Text>

      <Button label="Let's Play" onPress={onStart} style={{ width: '80%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    marginBottom: theme.spacing.lg,
    resizeMode: 'contain',
  },
});

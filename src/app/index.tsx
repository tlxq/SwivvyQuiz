import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { Button } from '@/components/ui';

export default function WelcomeScreen() {
  const onStart = () => router.replace('/(tabs)');

  return (
    <View style={theme.styles.centerScreen}>
      <Text style={[theme.typography.h1, { color: theme.colors.primary, marginBottom: theme.spacing.md }]}>
        SwivvyQuiz
      </Text>
      <Text style={[theme.typography.subtitle, { textAlign: 'center', marginBottom: theme.spacing.xl }]}>
        Test your knowledge across different categories and climb the leaderboard!
      </Text>
      
      <Button 
        label="Let's Play" 
        onPress={onStart} 
        style={{ width: '80%' }}
      />
    </View>
  );
}

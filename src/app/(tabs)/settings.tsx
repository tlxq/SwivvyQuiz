import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '@/theme';
import { Card, Button } from '@/components/ui';

export default function SettingsScreen() {
  return (
    <View style={theme.styles.container}>
      <Text style={[theme.typography.h1, { marginBottom: theme.spacing.md }]}>
        Statistics
      </Text>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text style={theme.typography.bodyBold}>Game Stats</Text>
        <Text style={theme.typography.body}>Total Games: 12</Text>
        <Text style={theme.typography.body}>Average Score: 75</Text>
      </Card>

      <Card style={{ marginBottom: theme.spacing.md }}>
        <Text style={theme.typography.bodyBold}>Settings</Text>
        <Text style={theme.typography.body}>Dark Mode: On</Text>
        <Text style={theme.typography.body}>Sound Effects: On</Text>
      </Card>

      <Button
        label="Clear History"
        variant="danger"
        onPress={() => alert('Feature coming soon!')}
      />
    </View>
  );
}

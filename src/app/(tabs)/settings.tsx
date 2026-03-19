import React from 'react';
import { Text } from 'react-native';
import { theme } from '@/theme';
import { Screen, Card, Button } from '@/components/ui';

export default function SettingsScreen() {
  return (
    <Screen loading={false} error={null} onBack={() => {}}>
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
        variant="surface"
        onPress={() => alert('Feature coming soon!')}
      />
    </Screen>
  );
}

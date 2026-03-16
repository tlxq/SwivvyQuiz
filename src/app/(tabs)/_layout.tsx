import React from 'react';
import { Tabs } from 'expo-router';
import { theme } from '@/theme';
import { AppIcon } from '@/components/ui';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => (
            <AppIcon icon={theme.icons.gameTab} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="highscore"
        options={{
          title: 'Highscore',
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              icon={theme.icons.highscoreTab}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

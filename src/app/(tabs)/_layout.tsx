import React from 'react';
import { Tabs } from 'expo-router';
import { colors, ICONS } from '@/theme';
import { AppIcon } from '@/components/ui';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        sceneStyle: { backgroundColor: '#000000' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => (
            <AppIcon icon={ICONS.gameTab} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="highscore"
        options={{
          title: 'Highscore',
          tabBarIcon: ({ color, size }) => (
            <AppIcon icon={ICONS.highscoreTab} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

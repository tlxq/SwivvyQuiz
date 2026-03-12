import { Tabs } from 'expo-router';
import { colors } from '@/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
      }}
    >
      {/* Game tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sports-esports" color={color} size={size} />
          ),
        }}
      />

      {/* Highscore tab */}
      <Tabs.Screen
        name="highscore"
        options={{
          title: 'Highscore',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

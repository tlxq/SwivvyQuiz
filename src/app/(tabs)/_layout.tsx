import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopColor: theme.colors.border,
      },
      headerStyle: {
        backgroundColor: theme.colors.surface,
      },
      headerTitleStyle: {
        ...theme.typography.h2,
      }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Quiz Setup',
          tabBarIcon: ({ color }) => <MaterialIcons name="play-arrow" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="highscore" 
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <MaterialIcons name="leaderboard" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}

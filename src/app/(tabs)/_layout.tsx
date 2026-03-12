import { Tabs } from 'expo-router';
import { colors } from '@/styles/colors';

// Tab bar is visible on every screen inside this group (Game and Highscore).
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
      }}
    >
      {/* index is the Game/Home tab — visible as the first tab */}
      <Tabs.Screen name="index"     options={{ title: 'Game' }} />
      <Tabs.Screen name="highscore" options={{ title: 'Highscore' }} />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import { colors } from '@/styles/colors';

// Tab bar is visible on every screen inside this group (Quiz and Profile).
// The `index` screen is hidden from the bar — it's only a redirect safety net.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
      }}
    >
      {/* Hidden from the tab bar — catches any bare /(tabs) navigations */}
      <Tabs.Screen name="index"   options={{ href: null }} />
      <Tabs.Screen name="quiz"    options={{ title: 'Quiz' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

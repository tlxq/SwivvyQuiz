import { Stack } from 'expo-router';

// Root navigator: the Home splash lives outside the tab group so the tab bar
// is invisible there. Navigating into (tabs) is what makes the tab bar appear.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

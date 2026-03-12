import { Stack } from 'expo-router';

// Root Stack: Welcome (no tabs) → (tabs) group → quiz Stack (no tabs).
// Keeping quiz outside (tabs) is what hides the tab bar during gameplay.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quiz" />
    </Stack>
  );
}

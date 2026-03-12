import { Stack } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // If fonts are not loaded yet, just render nothing or a simple loader
  if (!loaded) return null;

  // Root Stack: Welcome (no tabs) → (tabs) group → quiz Stack (no tabs).
  // Keeping quiz outside (tabs) is what hides the tab bar during gameplay.

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quiz" />
    </Stack>
  );
}

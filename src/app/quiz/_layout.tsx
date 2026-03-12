import { Stack } from 'expo-router';

// Quiz lives outside the (tabs) group so the tab bar is completely hidden
// during gameplay. Each screen controls its own header via Stack.Screen options
// declared inside the screen component.
export default function QuizLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="result" />
    </Stack>
  );
}

import { Stack } from 'expo-router';

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Quiz', headerShown: true }} />
      <Stack.Screen name="result" options={{ title: 'Result', headerShown: true }} />
    </Stack>
  );
}

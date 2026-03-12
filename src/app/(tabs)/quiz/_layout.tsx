import { Stack } from 'expo-router';

// Quiz has its own nested Stack so the Result screen can slide in over the Quiz
// screen while the parent Tabs bar remains visible underneath.
export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{ title: 'Quiz',   headerShown: true }} />
      <Stack.Screen name="result" options={{ title: 'Result', headerShown: true }} />
    </Stack>
  );
}

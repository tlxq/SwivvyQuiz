import { Redirect } from 'expo-router';

// Safety net: if (tabs) is ever opened without a specific path, land on Quiz.
// In normal flow this is never reached — Home always navigates to /(tabs)/quiz.
export default function TabIndex() {
  return <Redirect href="/(tabs)/quiz" />;
}

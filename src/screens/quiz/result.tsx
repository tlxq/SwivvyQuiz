import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { resultStyles } from '@/styles/screens/resultStyles';

export default function ResultScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();

  return (
    <View style={resultStyles.container}>
      <Text style={resultStyles.title}>Quiz Complete!</Text>
      <Text style={resultStyles.score}>Score: {score ?? '—'}</Text>
    </View>
  );
}

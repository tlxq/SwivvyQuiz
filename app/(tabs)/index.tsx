import { View, Text } from 'react-native';
import { homeStyles } from '@/styles/screens/homeStyles';

export default function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>SwivvyQuiz</Text>
      <Text style={homeStyles.subtitle}>Swipe YES or NO to answer trivia</Text>
    </View>
  );
}

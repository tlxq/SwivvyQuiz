import { View, Text } from 'react-native';
import { profileStyles } from '@/styles/screens/profileStyles';

// Placeholder screen — will display quiz history and personal stats
// once the backend and local storage layer are in place.
export default function ProfileScreen() {
  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>Profile</Text>
      <Text style={profileStyles.subtitle}>Stats and history go here</Text>
    </View>
  );
}

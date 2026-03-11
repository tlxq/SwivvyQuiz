import { View, Text } from 'react-native';
import { profileStyles } from '@/styles/screens/profileStyles';

export default function ProfileScreen() {
  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>Profile</Text>
      <Text style={profileStyles.subtitle}>Stats and history go here</Text>
    </View>
  );
}

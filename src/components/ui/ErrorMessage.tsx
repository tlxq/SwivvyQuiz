import { View, Text } from 'react-native';
import { theme } from '@/theme';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <View style={theme.styles.errorContainer}>
      <Text style={theme.styles.errorText}>{message}</Text>
    </View>
  );
}

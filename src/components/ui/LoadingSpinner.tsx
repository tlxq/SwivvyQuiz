import { ActivityIndicator, View } from 'react-native';
import { theme } from '@/theme';

export function LoadingSpinner() {
  return (
    <View style={theme.styles.loadingSpinner}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

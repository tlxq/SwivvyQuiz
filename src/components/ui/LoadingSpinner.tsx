import { ActivityIndicator, View } from 'react-native';
import { theme } from '@/theme';

export function LoadingSpinner() {
  return (
    <View
      style={[theme.styles.centered, { flex: 1, padding: theme.spacing.lg }]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

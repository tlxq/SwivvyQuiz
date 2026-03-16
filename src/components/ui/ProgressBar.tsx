import { View } from 'react-native';
import { theme } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <View
      style={{
        height: 8,
        backgroundColor: theme.colors.surface,
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
        marginVertical: theme.spacing.md,
      }}
    >
      <View
        style={{
          height: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 4,
          width: `${Math.round(progress * 100)}%`,
        }}
      />
    </View>
  );
}

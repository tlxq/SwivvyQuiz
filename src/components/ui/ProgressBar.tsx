import { View } from 'react-native';
import { theme } from '@/theme';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={theme.styles.progressBarTrack}>
      <View
        style={[
          theme.styles.progressBarFill,
          { width: `${Math.round(progress * 100)}%` },
        ]}
      />
    </View>
  );
}

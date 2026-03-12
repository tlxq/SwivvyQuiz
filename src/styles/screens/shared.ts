import type { ViewStyle } from 'react-native';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';

// Shared base for screens that centre their content on a white background
// (Quiz, Profile, Result). Spread into StyleSheet.create to avoid repetition.
export const centeredScreen: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.lg,
};

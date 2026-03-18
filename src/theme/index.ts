import { StyleSheet } from 'react-native';

const FONT_REGULAR = 'Poppins_400Regular';
const FONT_SEMIBOLD = 'Poppins_600SemiBold';
const FONT_BOLD = 'Poppins_700Bold';

const colors = {
  primary: '#5C7CFA',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceElevated: '#273449',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  success: '#4ADE80',
  error: '#F87171',
  border: '#334155',
  shadow: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const typography = {
  h1: { fontFamily: FONT_BOLD, fontSize: 32, color: colors.text },
  h2: { fontFamily: FONT_BOLD, fontSize: 24, color: colors.text },
  h3: { fontFamily: FONT_SEMIBOLD, fontSize: 20, color: colors.text },
  subtitle: { fontFamily: FONT_REGULAR, fontSize: 18, color: colors.textSecondary },
  body: { fontFamily: FONT_REGULAR, fontSize: 16, color: colors.text },
  bodyBold: { fontFamily: FONT_SEMIBOLD, fontSize: 16, color: colors.text },
  caption: { fontFamily: FONT_SEMIBOLD, fontSize: 14, color: colors.textSecondary, textTransform: 'uppercase' as const },
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.background },
  card: { backgroundColor: colors.surface, padding: spacing.lg, borderRadius: 20, borderWidth: 1, borderColor: colors.border, elevation: 4 },
  progressBarTrack: { height: 8, backgroundColor: colors.surface, borderRadius: 4, width: '100%', overflow: 'hidden', marginVertical: spacing.md },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  loadingSpinner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export const theme = { colors, spacing, typography, styles };

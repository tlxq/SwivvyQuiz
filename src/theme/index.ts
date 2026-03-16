import { StyleSheet } from 'react-native';

const poppins_regular = 'Poppins_400Regular';
const poppins_semiBold = 'Poppins_600SemiBold';
const poppins_bold = 'Poppins_700Bold';

const colors = {
  primary: '#5C7CFA',
  secondary: '#7C3AED',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceElevated: '#273449',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  success: '#4ADE80',
  error: '#F87171',
  border: '#334155',
  overlayDark: 'rgba(10,14,30,0.72)',
  surfaceTransparent: 'rgba(92,124,250,0.1)',
  shadow: '#000000',
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

export const theme = {
  colors,
  spacing,
  typography: {
    h1: {
      fontFamily: poppins_bold,
      fontSize: 32,
      color: colors.text,
      letterSpacing: -0.5,
      lineHeight: 40,
    },
    h2: {
      fontFamily: poppins_bold,
      fontSize: 24,
      color: colors.text,
      letterSpacing: -0.3,
      lineHeight: 32,
    },
    h3: {
      fontFamily: poppins_semiBold,
      fontSize: 20,
      color: colors.text,
      lineHeight: 28,
    },
    subtitle: {
      fontFamily: poppins_regular,
      fontSize: 18,
      color: colors.textSecondary,
      lineHeight: 26,
    },
    body: {
      fontFamily: poppins_regular,
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    bodyBold: {
      fontFamily: poppins_semiBold,
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    button: {
      fontFamily: poppins_bold,
      fontSize: 16,
      color: colors.text,
      textTransform: 'uppercase' as const,
      letterSpacing: 1,
    },
    caption: {
      fontFamily: poppins_semiBold,
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    tiny: {
      fontFamily: poppins_regular,
      fontSize: 12,
      color: colors.textMuted,
      lineHeight: 16,
    },
  },
  icons: {
    gameTab: { name: 'sports-esports', pack: 'MaterialIcons' },
    highscoreTab: { name: 'leaderboard', pack: 'MaterialIcons' },
    chevronUp: { name: 'keyboard-arrow-up', pack: 'MaterialIcons' },
    chevronDown: { name: 'keyboard-arrow-down', pack: 'MaterialIcons' },
    check: { name: 'check', pack: 'MaterialIcons' },
    brain: { name: 'psychology', pack: 'MaterialIcons' },
    // Trophy/score icons:
    trophy: { name: 'emoji-events', pack: 'MaterialIcons' },
    target: { name: 'my-location', pack: 'MaterialIcons' },
    muscle: { name: 'fitness-center', pack: 'MaterialIcons' },
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
    centered: { justifyContent: 'center', alignItems: 'center' },
    card: {
      backgroundColor: colors.surface,
      padding: spacing.lg,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    button: {
      minHeight: 48,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceElevated,
      paddingHorizontal: spacing.lg,
    },
    answerButton: {
      flex: 1,
      height: 64,
    },
    buttonText: {
      fontFamily: poppins_bold,
      fontSize: 16,
      color: colors.text,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      fontFamily: poppins_regular,
      fontSize: 16,
    },
    // Lägg till fler universella styles här vid behov
  }),
};

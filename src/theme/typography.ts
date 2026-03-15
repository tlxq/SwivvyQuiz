import { StyleSheet } from 'react-native';
import { colors } from './colors';

const FONT_REGULAR = 'Poppins_400Regular';
const FONT_SEMIBOLD = 'Poppins_600SemiBold';
const FONT_BOLD = 'Poppins_700Bold';

/**
 * Modern Typography - Using Poppins fonts.
 */
export const typography = StyleSheet.create({
  h1: {
    fontFamily: FONT_BOLD,
    fontSize: 32,
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
    color: colors.text,
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  h3: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 20,
    color: colors.text,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: FONT_REGULAR,
    fontSize: 18,
    color: colors.textSecondary,
    lineHeight: 26,
  },
  body: {
    fontFamily: FONT_REGULAR,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  button: {
    fontFamily: FONT_BOLD,
    fontSize: 16,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  caption: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tiny: {
    fontFamily: FONT_REGULAR,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
});

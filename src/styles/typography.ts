import { StyleSheet } from 'react-native';
import { colors } from './colors';

// Base text styles — spread these into StyleSheet.create calls and override
// only what needs to change (colour, textAlign, margin…).
export const typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: colors.textSecondary,
  },
});

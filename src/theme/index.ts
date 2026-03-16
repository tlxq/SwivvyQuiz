import { StyleSheet } from 'react-native';

// FONT TOKENS
const FONT_REGULAR = 'Poppins_400Regular';
const FONT_SEMIBOLD = 'Poppins_600SemiBold';
const FONT_BOLD = 'Poppins_700Bold';

// COLORS
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

// SPACING
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// TYPOGRAPHY
const typography = {
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
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  caption: {
    fontFamily: FONT_SEMIBOLD,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    textTransform: 'uppercase' as const,
  },
  tiny: {
    fontFamily: FONT_REGULAR,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
};

// UNIVERSAL STYLES
const styles = StyleSheet.create({
  // Containers, layout, utility
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  centered: { justifyContent: 'center', alignItems: 'center' },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  spaceBelowXl: { marginBottom: spacing.xl },
  spaceBelowXxl: { marginBottom: spacing.xxl },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSpread: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gapMd: { gap: spacing.md },

  // Cards and card headers
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
  cardHeader: { alignItems: 'center', marginBottom: spacing.xxl },
  cardRow: { flexDirection: 'row', alignItems: 'center' },

  // FlatList/layout
  listContent: { paddingBottom: spacing.xxl },
  centerBelowLg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  centerAboveMd: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },

  // Numeric rank badge (width for 2-digit numbers etc)
  rankNum: { width: 32, textAlign: 'center' },

  // Helpers for gap/margin
  marginLeftMd: { marginLeft: spacing.md },
  marginTop100: { marginTop: 100 },

  // Buttons
  button: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.lg,
    width: '100%',
  },
  buttonText: { ...typography.button },
  buttonFull: { width: '100%', paddingHorizontal: spacing.xl },
  answerButton: { flex: 1, height: 64 },

  // Error and loading
  errorText: {
    color: colors.error,
    textAlign: 'center',
    fontFamily: FONT_REGULAR,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  // ProgressBar
  progressBarTrack: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
    marginVertical: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  loadingSpinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  // Modal/Panel
  modalPanel: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  // Extra: Quiz scroll & answer
  quizScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  timerBlock: { gap: spacing.md, paddingTop: spacing.lg },
  timerText: {
    ...typography.bodyBold,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  answerRow: { flexDirection: 'row', gap: spacing.md },

  // Typography extras
  h1ScreenTitle: { ...typography.h1, marginTop: spacing.lg },
  subtitleScreen: {
    ...typography.subtitle,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

const icons = {
  gameTab: { name: 'sports-esports', pack: 'MaterialIcons' },
  highscoreTab: { name: 'leaderboard', pack: 'MaterialIcons' },
  chevronUp: { name: 'keyboard-arrow-up', pack: 'MaterialIcons' },
  chevronDown: { name: 'keyboard-arrow-down', pack: 'MaterialIcons' },
  check: { name: 'check', pack: 'MaterialIcons' },
  brain: { name: 'psychology', pack: 'MaterialIcons' },
  trophy: { name: 'emoji-events', pack: 'MaterialIcons' },
  target: { name: 'my-location', pack: 'MaterialIcons' },
  muscle: { name: 'fitness-center', pack: 'MaterialIcons' },
};

export const theme = { colors, spacing, typography, icons, styles };

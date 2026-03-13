export const colors = {
  primary: '#5C7CFA',
  secondary: '#7C3AED',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceElevated: '#273449',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#C4B5FD',
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  border: '#334155',
  focusRing: '#93C5FD',
  overlaySoft: 'rgba(255,255,255,0.06)',
  overlayMedium: 'rgba(255,255,255,0.12)',
  overlayStrong: 'rgba(255,255,255,0.20)',
  overlayLight: 'rgba(255,255,255,0.6)',
  overlayDark: 'rgba(10,14,30,0.72)',
  shadow: '#000000',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof colors;

export const BRAND_GRADIENT: [string, string] = [
  colors.primary,
  colors.secondary,
];

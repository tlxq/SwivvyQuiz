export const colors = {
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
  surfaceTransparent: 'rgba(92, 124, 250, 0.1)',
  shadow: '#000000',
  transparent: 'transparent',
} as const;

export const BRAND_GRADIENT: [string, string] = [
  colors.primary,
  colors.secondary,
];

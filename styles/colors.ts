export const colors = {
  primary: '#4F46E5',
  secondary: '#7C3AED',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  border: '#E5E7EB',
} as const;

export type ColorKey = keyof typeof colors;

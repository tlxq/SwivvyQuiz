// Single source of truth for the colour palette.
// Never hardcode hex values outside this file.
export const colors = {
  primary:       '#4F46E5', // Indigo  — brand colour, buttons, active states
  secondary:     '#7C3AED', // Violet  — gradient end-colour on the Home screen
  background:    '#F9FAFB', // Near-white — default screen background
  surface:       '#FFFFFF', // Pure white — cards, button fills
  text:          '#111827', // Almost-black — default body text
  textSecondary: '#6B7280', // Grey    — hints, captions, placeholder text
  success:       '#10B981', // Emerald — reserved for correct-answer feedback
  error:         '#EF4444', // Red     — error messages, wrong-answer feedback
  border:        '#E5E7EB', // Light grey — borders, dividers, secondary button stroke
} as const;

export type ColorKey = keyof typeof colors;

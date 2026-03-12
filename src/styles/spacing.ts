// Spacing scale in pixels — based on a 4-point grid.
// Use these everywhere instead of magic numbers.
export const spacing = {
  xs:  4,  // Reserved — tight gaps (e.g. icon-to-label)
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

export type SpacingKey = keyof typeof spacing;

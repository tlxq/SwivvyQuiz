// Centralise route paths so a rename only requires one edit here.
export const Routes = {
  welcome:   '/',
  tabs:      '/(tabs)',
  quiz:      '/quiz',
  highscore: '/(tabs)/highscore',
} as const;

// Centralise route paths so a rename only requires one edit here instead of
// hunting through every router.push / router.replace call in the codebase.
export const Routes = {
  welcome:    '/',
  tabs:       '/(tabs)',
  quiz:       '/quiz',
  quizResult: '/quiz/result',
  highscore:  '/(tabs)/highscore',
} as const;

// Single source of truth for all quiz game-rules constants.
// Scoring math in quiz/index and result/highscore all derive from here,
// so tweaking difficulty only requires a change in this one file.
export const TOTAL_QUESTIONS = 5;
export const TIMER_DURATION = 15; // seconds per question
export const BASE_POINTS = 10; // awarded for any correct answer
export const MAX_BONUS = 5; // extra pts for fast answers (proportional to time left)
export const MAX_SCORE = TOTAL_QUESTIONS * (BASE_POINTS + MAX_BONUS); // 150

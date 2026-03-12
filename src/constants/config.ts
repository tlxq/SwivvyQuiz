// Read the API base URL from an Expo env var so it can differ per environment.
// Set EXPO_PUBLIC_TRIVIA_API_URL in .env (e.g. https://opentdb.com).
export const Config = {
  triviaApiUrl: process.env.EXPO_PUBLIC_TRIVIA_API_URL ?? '',
} as const;

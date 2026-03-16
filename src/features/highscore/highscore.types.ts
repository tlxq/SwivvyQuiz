export interface HighScoreFlowProps {
  score: number;
  isCompleted: boolean;
  categoryId: number;
  categoryName: string;
}

export interface HighScoreEntry {
  id?: string;
  categoryId: number;
  categoryName: string;
  score: number;
  username?: string;
  timestamp?: number;
}

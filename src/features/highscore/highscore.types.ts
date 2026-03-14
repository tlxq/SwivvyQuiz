export interface HighScoreFlowProps {
  score: number;
  isCompleted: boolean;
  categoryId: string;
  categoryName: string;
}

export interface HighScoreEntry {
  id?: string;
  categoryId: string;
  categoryName: string;
  score: number;
  username?: string;
  timestamp?: number;
}

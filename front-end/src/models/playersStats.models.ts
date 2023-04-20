export interface PlayerStats {
  id: number;
  stats: {
    date: number[];
    played: number[];
    correct: number[];
    click_accuracy: number[];
  }
}

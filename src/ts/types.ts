export interface State {
  number: number;
  guess: number;
  status: 'low' | 'high' | 'correct' | 'lose' | 'start';
  score: number;
  highscore: number;
}

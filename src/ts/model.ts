import { MAX_SCORE } from './config.js';
import { State } from './types.js';
export const state: State = {
  number: 0,
  guess: 0,
  status: 'start',
  score: MAX_SCORE,
  highscore: 0,
};

export const setNumber = function (number: number): void {
  state.number = number;
};
export const setGuess = function (number: number): void {
  state.guess = number;
};
export const setStatus = function (): void {
  if (state.score > 0) {
    if (state.guess === state.number) {
      state.status = 'correct';
      if (state.score > state.highscore) state.highscore = state.score;
    } else if (state.guess > state.number) {
      state.status = 'high';
      state.score--;
    } else if (state.guess < state.number) {
      state.status = 'low';
      state.score--;
    }
  } else state.status = 'lose';
  persistLocalStorage();
};
export const resetState = function (): void {
  state.score = MAX_SCORE;
  state.status = 'start';
  state.guess = 0;
  state.number = 0;
};
const persistLocalStorage = function (): void {
  localStorage.setItem('highscore', JSON.stringify(state.highscore));
};
const init = function (): void {
  const storgeString = localStorage.getItem('highscore');
  if (!storgeString) return;
  const storge: number = JSON.parse(storgeString);
  state.highscore = storge;
  resetState();
};
init();

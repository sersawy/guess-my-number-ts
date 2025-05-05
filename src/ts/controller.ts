import * as model from './model.js';
import view from './view.js';
import { MIN_NUMBER, MAX_NUMBER } from './config.js';
import { getRandomNumber } from './helper.js';

if (module.hot) {
  module.hot.accept();
}
const controlGuess = function (number: number): void {
  model.setGuess(number);
  model.setStatus();
  view.render(model.state);
};
const controlAgain = function (): void {
  model.setNumber(getRandomNumber(MIN_NUMBER, MAX_NUMBER));
  model.resetState();
  view.render(model.state);
};
const init = function (): void {
  try {
    model.setNumber(getRandomNumber(MIN_NUMBER, MAX_NUMBER));
    view.render(model.state);
    view.addGuessHandler(controlGuess);
    view.addAgainHandler(controlAgain);
  } catch (e: any) {
    view.renderError(e);
    console.error(e);
  }
};
document.addEventListener('DOMContentLoaded', function () {
  init();
});
// const message = document.querySelector('.message');
// const number = document.querySelector('.number');
// const inputNumber = document.querySelector('.guess');
// const labelScore = document.querySelector('.score');
// const labelHighscore = document.querySelector('.highscore');
// const btnCheck = document.querySelector('.check');
// const btnAgain = document.querySelector('.again');

import { State } from './types.js';
import { MIN_NUMBER, MAX_NUMBER } from './config.js';

class View {
  private data!: State;
  body: HTMLBodyElement = document.querySelector('body') as HTMLBodyElement;
  btnCheck: HTMLButtonElement = document.querySelector(
    '.check'
  ) as HTMLButtonElement;
  btnAgain: HTMLButtonElement = document.querySelector(
    '.again'
  ) as HTMLButtonElement;
  form: HTMLFormElement = document.querySelector(
    '.form_guess'
  ) as HTMLFormElement;
  inputNumber: HTMLInputElement = document.querySelector(
    '.guess'
  ) as HTMLInputElement;
  message: HTMLParagraphElement = document.querySelector(
    '.message'
  ) as HTMLParagraphElement;
  labelScore: HTMLParagraphElement = document.querySelector(
    '.score'
  ) as HTMLParagraphElement;
  labelHighscore: HTMLParagraphElement = document.querySelector(
    '.highscore'
  ) as HTMLParagraphElement;
  number: HTMLDivElement = document.querySelector('.number') as HTMLDivElement;
  errorMessage: string = '⛔️ No number!';
  constructor() {}
  public addGuessHandler(handler: (number: number) => void) {
    this.form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const number: number = +this.inputNumber.value;
      if (!number) return this.renderError();
      if (number > MAX_NUMBER || number < MIN_NUMBER)
        return this.renderError(
          `⛔️ Enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}!`
        );
      handler(number);
    });
  }
  public addAgainHandler(handler: () => void) {
    this.btnAgain.addEventListener('click', (e: Event) => {
      this.renderStart();
      handler();
    });
  }
  public render(data: State) {
    this.data = data;
    this.renderStatus();
    this.renderScore();
    this.renderHighscore();
  }
  private renderScore(): void {
    this.labelScore.textContent = String(this.data.score);
  }
  private renderHighscore(): void {
    this.labelHighscore.textContent = `${this.data.highscore}`;
  }
  private renderStatus(): void {
    if (this.data.status === 'low') this.renderLow();
    else if (this.data.status === 'high') this.renderHigh();
    else if (this.data.status === 'correct') this.renderCorrect();
    else if (this.data.status === 'lose') this.renderLose();
    else this.renderStart();
  }
  private renderStart(): void {
    this.message.textContent = 'Start guessing...';
    this.inputNumber.value = '';
    this.number.textContent = `?`;
    this.body.style.background = '#222';
    this.btnCheck.disabled = false;
    this.inputNumber.disabled = false;
  }
  private renderLow(): void {
    this.message.textContent = '📉 Too low!';
  }
  private renderHigh(): void {
    this.message.textContent = '📈 Too high!';
  }
  private renderCorrect(): void {
    this.number.textContent = `${this.data.number}`;
    this.btnCheck.disabled = true;
    this.inputNumber.disabled = true;
    this.message.textContent =
      '🎉 Correct Number! Click Aagin Button to play again';
    this.body.style.background = 'green';
  }
  private renderLose(): void {
    this.number.textContent = `${this.data.number}`;
    this.btnCheck.disabled = true;
    this.inputNumber.disabled = true;
    this.message.textContent =
      '💥 You lost the game! Click Aagin Button to play again';
    this.body.style.background = 'red';
  }
  public renderError(msg: string = this.errorMessage): void {
    this.message.textContent = msg;
  }
}
export default new View();

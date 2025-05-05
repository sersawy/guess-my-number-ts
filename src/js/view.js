"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("./config.js");
class View {
    constructor() {
        this.body = document.querySelector('body');
        this.btnCheck = document.querySelector('.check');
        this.btnAgain = document.querySelector('.again');
        this.form = document.querySelector('.form_guess');
        this.inputNumber = document.querySelector('.guess');
        this.message = document.querySelector('.message');
        this.labelScore = document.querySelector('.score');
        this.labelHighscore = document.querySelector('.highscore');
        this.number = document.querySelector('.number');
        this.errorMessage = '⛔️ No number!';
    }
    addGuessHandler(handler) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const number = +this.inputNumber.value;
            if (!number)
                return this.renderError();
            if (number > config_js_1.MAX_NUMBER || number < config_js_1.MIN_NUMBER)
                return this.renderError(`⛔️ Enter a number between ${config_js_1.MIN_NUMBER} and ${config_js_1.MAX_NUMBER}!`);
            handler(number);
        });
    }
    addAgainHandler(handler) {
        this.btnAgain.addEventListener('click', (e) => {
            this.renderStart();
            handler();
        });
    }
    render(data) {
        this.data = data;
        this.renderStatus();
        this.renderScore();
        this.renderHighscore();
    }
    renderScore() {
        this.labelScore.textContent = String(this.data.score);
    }
    renderHighscore() {
        this.labelHighscore.textContent = `${this.data.highscore}`;
    }
    renderStatus() {
        if (this.data.status === 'low')
            this.renderLow();
        else if (this.data.status === 'high')
            this.renderHigh();
        else if (this.data.status === 'correct')
            this.renderCorrect();
        else if (this.data.status === 'lose')
            this.renderLose();
        else
            this.renderStart();
    }
    renderStart() {
        this.message.textContent = 'Start guessing...';
        this.inputNumber.value = '';
        this.number.textContent = `?`;
        this.body.style.background = '#222';
        this.btnCheck.disabled = false;
        this.inputNumber.disabled = false;
    }
    renderLow() {
        this.message.textContent = '📉 Too low!';
    }
    renderHigh() {
        this.message.textContent = '📈 Too high!';
    }
    renderCorrect() {
        this.number.textContent = `${this.data.number}`;
        this.btnCheck.disabled = true;
        this.inputNumber.disabled = true;
        this.message.textContent =
            '🎉 Correct Number! Click Aagin Button to play again';
        this.body.style.background = 'green';
    }
    renderLose() {
        this.number.textContent = `${this.data.number}`;
        this.btnCheck.disabled = true;
        this.inputNumber.disabled = true;
        this.message.textContent =
            '💥 You lost the game! Click Aagin Button to play again';
        this.body.style.background = 'red';
    }
    renderError(msg = this.errorMessage) {
        this.message.textContent = msg;
    }
}
exports.default = new View();

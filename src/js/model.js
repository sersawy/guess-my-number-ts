"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetState = exports.setStatus = exports.setGuess = exports.setNumber = exports.state = void 0;
const config_js_1 = require("./config.js");
exports.state = {
    number: 0,
    guess: 0,
    status: 'start',
    score: config_js_1.MAX_SCORE,
    highscore: 0,
};
const setNumber = function (number) {
    exports.state.number = number;
};
exports.setNumber = setNumber;
const setGuess = function (number) {
    exports.state.guess = number;
};
exports.setGuess = setGuess;
const setStatus = function () {
    if (exports.state.score > 0) {
        if (exports.state.guess === exports.state.number) {
            exports.state.status = 'correct';
            if (exports.state.score > exports.state.highscore)
                exports.state.highscore = exports.state.score;
        }
        else if (exports.state.guess > exports.state.number) {
            exports.state.status = 'high';
            exports.state.score--;
        }
        else if (exports.state.guess < exports.state.number) {
            exports.state.status = 'low';
            exports.state.score--;
        }
    }
    else
        exports.state.status = 'lose';
    persistLocalStorage();
};
exports.setStatus = setStatus;
const resetState = function () {
    exports.state.score = config_js_1.MAX_SCORE;
    exports.state.status = 'start';
    exports.state.guess = 0;
    exports.state.number = 0;
};
exports.resetState = resetState;
const persistLocalStorage = function () {
    localStorage.setItem('highscore', JSON.stringify(exports.state.highscore));
};
const init = function () {
    const storgeString = localStorage.getItem('highscore');
    if (!storgeString)
        return;
    const storge = JSON.parse(storgeString);
    exports.state.highscore = storge;
    (0, exports.resetState)();
};
init();

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model = __importStar(require("./model.js"));
const view_js_1 = __importDefault(require("./view.js"));
const config_js_1 = require("./config.js");
const helper_js_1 = require("./helper.js");
if (module.hot) {
    module.hot.accept();
}
const controlGuess = function (number) {
    model.setGuess(number);
    model.setStatus();
    view_js_1.default.render(model.state);
};
const controlAgain = function () {
    model.setNumber((0, helper_js_1.getRandomNumber)(config_js_1.MIN_NUMBER, config_js_1.MAX_NUMBER));
    model.resetState();
    view_js_1.default.render(model.state);
};
const init = function () {
    try {
        model.setNumber((0, helper_js_1.getRandomNumber)(config_js_1.MIN_NUMBER, config_js_1.MAX_NUMBER));
        view_js_1.default.render(model.state);
        view_js_1.default.addGuessHandler(controlGuess);
        view_js_1.default.addAgainHandler(controlAgain);
    }
    catch (e) {
        view_js_1.default.renderError(e);
        console.error(e);
    }
};
document.addEventListener('DOMContentLoaded', function () {
    init();
});

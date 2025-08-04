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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeLanguageMenu = void 0;
const MainMenu_1 = require("./menu/impl/MainMenu"); // adjust path if needed
const readline = __importStar(require("readline"));
const RESOURCE_BUNDLE = {
    "change.language.header": {
        en: "Change Language",
        ru: "Сменить язык",
    },
    "select.language.cta": {
        en: "Select language (1 - English, 2 - Russian): ",
        ru: "Выберите язык (1 - Английский, 2 - Русский): ",
    },
};
class ChangeLanguageMenu {
    constructor() {
        this.currentLanguage = "en";
    }
    getString(key) {
        return RESOURCE_BUNDLE[key][this.currentLanguage] || key;
    }
    async start() {
        this.printMenuHeader();
        const languageId = await this.getUserInput();
        switch (languageId) {
            case ChangeLanguageMenu.ENGLISH_ID:
                this.currentLanguage = "en";
                break;
            case ChangeLanguageMenu.RUSSIAN_ID:
                this.currentLanguage = "ru";
                break;
        }
        // Set language globally if needed
        // For example, you can store it in some global state or context
        // Start MainMenu after language change
        const mainMenu = new MainMenu_1.MainMenu();
        mainMenu.start();
    }
    printMenuHeader() {
        console.log(this.getString("change.language.header"));
        process.stdout.write(this.getString("select.language.cta"));
    }
    getUserInput() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise((resolve) => {
            rl.question("", (answer) => {
                rl.close();
                const num = parseInt(answer.trim(), 10);
                resolve(num);
            });
        });
    }
}
exports.ChangeLanguageMenu = ChangeLanguageMenu;
ChangeLanguageMenu.ENGLISH_ID = 1;
ChangeLanguageMenu.RUSSIAN_ID = 2;

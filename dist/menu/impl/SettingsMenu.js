"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsMenu = void 0;
const ApplicationContext_1 = require("@src/configs/ApplicationContext");
const i18next_1 = __importDefault(require("i18next"));
const MainMenu_1 = require("@src/menu/impl/MainMenu"); // Adjust path as needed
const ChangePasswordMenu_1 = require("@src/menu/impl/ChangePasswordMenu"); // Adjust path as needed
const ChangeEmailMenu_1 = require("@src/menu/impl/ChangeEmailMenu"); // Adjust path as needed
class SettingsMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
    }
    async start() {
        let menuToNavigate = null;
        mainLoop: while (true) {
            this.printMenuHeader();
            if (this.context.getLoggedInUser() == null) {
                console.log("Please, log in or create new account to change your account settings");
                new MainMenu_1.MainMenu().start();
                return;
            }
            else {
                console.log(i18next_1.default.t("settings.options"));
                const userInput = await this.prompt(i18next_1.default.t("enter.option"));
                if (userInput.toLowerCase() === MainMenu_1.MainMenu.MENU_COMMAND.toLowerCase()) {
                    menuToNavigate = new MainMenu_1.MainMenu();
                    break mainLoop;
                }
                const userOption = Number(userInput);
                switch (userOption) {
                    case 1:
                        menuToNavigate = new ChangePasswordMenu_1.ChangePasswordMenu();
                        break mainLoop;
                    case 2:
                        menuToNavigate = new ChangeEmailMenu_1.ChangeEmailMenu();
                        break mainLoop;
                    default:
                        console.log(i18next_1.default.t("settings.option.validation.msg"));
                        continue;
                }
            }
        }
        menuToNavigate?.start();
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("settings.menu.header"));
    }
    // Helper to prompt user input via console (Node.js environment)
    prompt(question) {
        return new Promise((resolve) => {
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.question(question + " ", (answer) => {
                readline.close();
                resolve(answer.trim());
            });
        });
    }
}
exports.SettingsMenu = SettingsMenu;

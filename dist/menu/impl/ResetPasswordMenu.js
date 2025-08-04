"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordMenu = void 0;
const DefaultResetPasswordService_1 = require("./services/impl/DefaultResetPasswordService");
const DefaultUserManagementService_1 = require("./services/impl/DefaultUserManagementService");
const i18next_1 = __importDefault(require("i18next"));
const MainMenu_1 = require("./MainMenu"); // adjust import path as needed
class ResetPasswordMenu {
    constructor() {
        this.resetPasswordService = new DefaultResetPasswordService_1.DefaultResetPasswordService();
        this.userManagementService = DefaultUserManagementService_1.DefaultUserManagementService.getInstance();
    }
    async start() {
        this.printMenuHeader();
        const userInput = await this.prompt("");
        console.log(i18next_1.default.t("pass.sent.to.email"));
        // Run reset password asynchronously (non-blocking)
        this.resetPasswordForUserAsync(userInput);
        // Navigate to main menu
        new MainMenu_1.MainMenu().start();
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("reset.pass.header"));
        process.stdout.write(i18next_1.default.t("enter.your.email.msg") + " ");
    }
    async resetPasswordForUserAsync(email) {
        try {
            const user = this.userManagementService.getUserByEmail(email);
            if (user) {
                await this.resetPasswordService.resetPasswordForUser(user);
            }
            else {
                console.log(i18next_1.default.t("user.not.found"));
            }
        }
        catch (error) {
            console.error(i18next_1.default.t("reset.password.error"), error);
        }
    }
    prompt(question) {
        return new Promise((resolve) => {
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.question(question, (answer) => {
                readline.close();
                resolve(answer.trim());
            });
        });
    }
}
exports.ResetPasswordMenu = ResetPasswordMenu;

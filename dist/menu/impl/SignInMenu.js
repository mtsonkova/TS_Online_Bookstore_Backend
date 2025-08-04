"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInMenu = void 0;
const ApplicationContext_1 = require("./configs/ApplicationContext");
const DefaultUserManagementService_1 = require("./services/impl/DefaultUserManagementService");
const i18next_1 = __importDefault(require("i18next"));
class SignInMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.userManagementService = DefaultUserManagementService_1.DefaultUserManagementService.getInstance();
    }
    async start() {
        this.printMenuHeader();
        // For input, you might use prompt-sync or any other input method depending on your environment.
        // Here, I'll use a simple prompt function for demonstration (you might replace it with your own input logic)
        const userEmail = await this.prompt(i18next_1.default.t("please.enter.email"));
        const userPassword = await this.prompt(i18next_1.default.t("please.enter.pass"));
        const user = this.userManagementService.getUserByEmail(userEmail);
        if (user && user.getPassword() === userPassword) {
            console.log(i18next_1.default.t("glad.to.see.you.back", {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
            }));
            this.context.setLoggedInUser(user);
        }
        else {
            console.log(i18next_1.default.t("login.and.password.not.exist"));
        }
        const mainMenu = this.context.getMainMenu();
        if (mainMenu) {
            mainMenu.start();
        }
        else {
            console.log("Main menu is not available.");
        }
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("sign.in.header"));
    }
    // Helper method to simulate input (replace with actual input logic)
    prompt(question) {
        return new Promise((resolve) => {
            // For example, if running in Node.js, use 'readline' to get input from terminal
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
exports.SignInMenu = SignInMenu;

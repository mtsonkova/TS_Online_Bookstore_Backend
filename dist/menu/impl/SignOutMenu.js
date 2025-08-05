"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOutMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const i18next_1 = __importDefault(require("i18next")); // Assuming you're using i18next
class SignOutMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
    }
    start() {
        this.printMenuHeader();
        this.context.setLoggedInUser(null);
        const mainMenu = this.context.getMainMenu();
        if (mainMenu) {
            mainMenu.start();
        }
        else {
            console.log("Main menu is null or undefined.");
        }
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("sign.out.header"));
        console.log(i18next_1.default.t("bye.msg"));
    }
}
exports.SignOutMenu = SignOutMenu;

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
exports.ChangePasswordMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const readline = __importStar(require("readline"));
const MainMenu_1 = require("./MainMenu"); // adjust path if necessary
const RESOURCE_BUNDLE = {
    "change.password.header": {
        en: "Change Password",
        ru: "Сменить пароль",
    },
    "enter.new.pass.cta": {
        en: "Enter new password: ",
        ru: "Введите новый пароль: ",
    },
    "change.password.msg": {
        en: "Password changed successfully!",
        ru: "Пароль успешно изменён!",
    },
};
class ChangePasswordMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.currentLanguage = "en";
    }
    getString(key) {
        return RESOURCE_BUNDLE[key][this.currentLanguage] ?? key;
    }
    async start() {
        this.printMenuHeader();
        const userInput = await this.getUserInput();
        const loggedInUser = this.context.getLoggedInUser();
        if (loggedInUser) {
            loggedInUser.setPassword(userInput);
            console.log(this.getString("change.password.msg"));
        }
        else {
            console.log("No user is currently logged in.");
        }
        const mainMenu = new MainMenu_1.MainMenu();
        mainMenu.start();
    }
    printMenuHeader() {
        console.log(this.getString("change.password.header"));
        process.stdout.write(this.getString("enter.new.pass.cta"));
    }
    getUserInput() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise((resolve) => {
            rl.question("", (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    }
}
exports.ChangePasswordMenu = ChangePasswordMenu;

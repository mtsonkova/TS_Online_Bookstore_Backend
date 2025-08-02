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
exports.MainMenu = void 0;
const ApplicationContext_1 = require("@src/configs/ApplicationContext");
const readline = __importStar(require("readline"));
const i18next_1 = __importDefault(require("i18next"));
const SignUpMenu_1 = require("@src/menu/impl/SignUpMenu");
const SignInMenu_1 = require("@src/menu/impl/SignInMenu");
const SignOutMenu_1 = require("@src/menu/impl/SignOutMenu");
const ProductCatalogMenu_1 = require("@src/menu/impl/ProductCatalogMenu");
const MyOrdersMenu_1 = require("@src/menu/impl/MyOrdersMenu");
const SettingsMenu_1 = require("@src/menu/impl/SettingsMenu");
const CustomerListMenu_1 = require("@src/menu/impl/CustomerListMenu");
const ResetPasswordMenu_1 = require("@src/menu/impl/ResetPasswordMenu");
const ChangeLanguageMenu_1 = require("@src/menu/impl/ChangeLanguageMenu");
class MainMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
    }
    async start() {
        if (!this.context.getMainMenu()) {
            this.context.setMainMenu(this);
        }
        let menuToNavigate = null;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        mainLoop: while (true) {
            this.printMenuHeader();
            const userInput = await new Promise((resolve) => rl.question(i18next_1.default.t("user.input") + " ", resolve));
            if (userInput.toLowerCase() === MainMenu.MENU_COMMAND) {
                rl.close();
                process.exit(0);
            }
            const commandNumber = parseInt(userInput, 10);
            if (isNaN(commandNumber)) {
                console.log(i18next_1.default.t("err.msg"));
                continue mainLoop;
            }
            switch (commandNumber) {
                case 1:
                    menuToNavigate = new SignUpMenu_1.SignUpMenu();
                    break mainLoop;
                case 2:
                    menuToNavigate = this.context.getLoggedInUser()
                        ? new SignOutMenu_1.SignOutMenu()
                        : new SignInMenu_1.SignInMenu();
                    break mainLoop;
                case 3:
                    menuToNavigate = new ProductCatalogMenu_1.ProductCatalogMenu();
                    break mainLoop;
                case 4:
                    menuToNavigate = new MyOrdersMenu_1.MyOrdersMenu();
                    break mainLoop;
                case 5:
                    menuToNavigate = new SettingsMenu_1.SettingsMenu();
                    break mainLoop;
                case 6:
                    menuToNavigate = new CustomerListMenu_1.CustomerListMenu();
                    break mainLoop;
                case 7:
                    menuToNavigate = new ResetPasswordMenu_1.ResetPasswordMenu();
                    break mainLoop;
                case 8:
                    menuToNavigate = new ChangeLanguageMenu_1.ChangeLanguageMenu();
                    break mainLoop;
                default:
                    console.log(i18next_1.default.t("err.msg"));
                    continue mainLoop;
            }
        }
        rl.close();
        if (menuToNavigate) {
            await menuToNavigate.start();
        }
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("main.menu.header"));
        if (!this.context.getLoggedInUser()) {
            console.log(i18next_1.default.t("menu.for.not.logged.in.user"));
        }
        else {
            console.log(i18next_1.default.t("menu.for.logged.in.user"));
        }
    }
}
exports.MainMenu = MainMenu;
MainMenu.MENU_COMMAND = "menu";

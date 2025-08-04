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
exports.MainMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const index_1 = require("src/index"); // Import Main to access EXIT_COMMAND
const readline = __importStar(require("readline"));
const SignUpMenu_1 = require("src/menu/impl/SignUpMenu");
const SignInMenu_1 = require("src/menu/impl/SignInMenu");
const SignOutMenu_1 = require("src/menu/impl/SignOutMenu");
const ProductCatalogMenu_1 = require("src/menu/impl/ProductCatalogMenu");
const MyOrdersMenu_1 = require("src/menu/impl/MyOrdersMenu");
const SettingsMenu_1 = require("src/menu/impl/SettingsMenu");
const CustomerListMenu_1 = require("src/menu/impl/CustomerListMenu");
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
            const userInput = await new Promise((resolve) => rl.question("User input: ", resolve));
            // Check for exit command (like Java version)
            if (userInput.toLowerCase() === index_1.Main.EXIT_COMMAND.toLowerCase()) {
                rl.close();
                process.exit(0);
            }
            const commandNumber = parseInt(userInput, 10);
            if (isNaN(commandNumber)) {
                console.log("Only 1, 2, 3, 4, 5, 6 is allowed. Try one more time");
                continue mainLoop;
            }
            switch (commandNumber) {
                case 1:
                    menuToNavigate = new SignUpMenu_1.SignUpMenu();
                    break mainLoop;
                case 2:
                    if (this.context.getLoggedInUser() === null) {
                        menuToNavigate = new SignInMenu_1.SignInMenu();
                    }
                    else {
                        menuToNavigate = new SignOutMenu_1.SignOutMenu();
                    }
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
                default:
                    console.log("Only 1, 2, 3, 4, 5, 6 is allowed. Try one more time");
                    continue mainLoop;
            }
        }
        rl.close();
        if (menuToNavigate) {
            await menuToNavigate.start();
        }
    }
    printMenuHeader() {
        console.log("***** MAIN MENU *****");
        if (this.context.getLoggedInUser() === null) {
            console.log(MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_OUT_USER);
        }
        else {
            console.log(MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_IN_USER);
        }
    }
}
exports.MainMenu = MainMenu;
MainMenu.MENU_COMMAND = "menu";
MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_OUT_USER = "Please, enter number in console to proceed.\n" +
    "1. Sign Up\n" +
    "2. Sign In\n" +
    "3. Product Catalog\n" +
    "4. My Orders\n" +
    "5. Settings\n" +
    "6. Customer List";
MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_IN_USER = "Please, enter number in console to proceed.\n" +
    "1. Sign Up\n" +
    "2. Sign Out\n" +
    "3. Product Catalog\n" +
    "4. My Orders\n" +
    "5. Settings\n" +
    "6. Customer List";

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
exports.SignUpMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const DefaultUser_1 = require("src/entities/impl/DefaultUser");
const DefaultUserManagementService_1 = require("src/services/impl/DefaultUserManagementService");
const readline = __importStar(require("readline"));
const i18n_1 = __importDefault(require("src/i18n/i18n"));
class SignUpMenu {
    constructor() {
        this.userManagementService = DefaultUserManagementService_1.DefaultUserManagementService.getInstance();
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
    }
    async start() {
        this.printMenuHeader();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const ask = (key) => new Promise((resolve) => rl.question(i18n_1.default.t(key), resolve));
        const firstName = await ask("enter.your.first.name");
        const lastName = await ask("enter.your.last.name");
        const password = await ask("enter.your.pass");
        const email = await ask("enter.your.email");
        rl.close();
        this.userManagementService.getUsers(); // preload users
        const user = new DefaultUser_1.DefaultUser(undefined, firstName, lastName, password, email);
        const errorMessage = this.userManagementService.registerUser(user);
        if (!errorMessage) {
            this.context.setLoggedInUser(user);
            console.log(i18n_1.default.t("user.created.msg"));
        }
        else {
            console.log(errorMessage);
        }
        const mainMenu = this.context.getMainMenu();
        if (mainMenu != null) {
            mainMenu.start();
        }
        else {
            console.log("The main menu object is null or undefined.");
        }
    }
    printMenuHeader() {
        console.log(i18n_1.default.t("sign.up.header"));
    }
}
exports.SignUpMenu = SignUpMenu;

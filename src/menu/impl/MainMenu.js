"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenu = void 0;
var ApplicationContext_1 = require("src/configs/ApplicationContext");
var readline = require("readline");
var i18next_1 = require("i18next");
var SignUpMenu_1 = require("src/menu/impl/SignUpMenu");
var SignInMenu_1 = require("src/menu/impl/SignInMenu");
var SignOutMenu_1 = require("src/menu/impl/SignOutMenu");
var ProductCatalogMenu_1 = require("src/menu/impl/ProductCatalogMenu");
var MyOrdersMenu_1 = require("src/menu/impl/MyOrdersMenu");
var SettingsMenu_1 = require("src/menu/impl/SettingsMenu");
var CustomerListMenu_1 = require("src/menu/impl/CustomerListMenu");
var ResetPasswordMenu_1 = require("src/menu/impl/ResetPasswordMenu");
var ChangeLanguageMenu_1 = require("src/menu/impl/ChangeLanguageMenu");
var MainMenu = /** @class */ (function () {
    function MainMenu() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
    }
    MainMenu.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menuToNavigate, rl, userInput, commandNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.context.getMainMenu()) {
                            this.context.setMainMenu(this);
                        }
                        menuToNavigate = null;
                        rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout,
                        });
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        this.printMenuHeader();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return rl.question(i18next_1.default.t("user.input") + " ", resolve);
                            })];
                    case 2:
                        userInput = _a.sent();
                        if (userInput.toLowerCase() === MainMenu.MENU_COMMAND) {
                            rl.close();
                            process.exit(0);
                        }
                        commandNumber = parseInt(userInput, 10);
                        if (isNaN(commandNumber)) {
                            console.log(i18next_1.default.t("err.msg"));
                            return [3 /*break*/, 1];
                        }
                        switch (commandNumber) {
                            case 1:
                                menuToNavigate = new SignUpMenu_1.SignUpMenu();
                                return [3 /*break*/, 3];
                            case 2:
                                menuToNavigate = this.context.getLoggedInUser()
                                    ? new SignOutMenu_1.SignOutMenu()
                                    : new SignInMenu_1.SignInMenu();
                                return [3 /*break*/, 3];
                            case 3:
                                menuToNavigate = new ProductCatalogMenu_1.ProductCatalogMenu();
                                return [3 /*break*/, 3];
                            case 4:
                                menuToNavigate = new MyOrdersMenu_1.MyOrdersMenu();
                                return [3 /*break*/, 3];
                            case 5:
                                menuToNavigate = new SettingsMenu_1.SettingsMenu();
                                return [3 /*break*/, 3];
                            case 6:
                                menuToNavigate = new CustomerListMenu_1.CustomerListMenu();
                                return [3 /*break*/, 3];
                            case 7:
                                menuToNavigate = new ResetPasswordMenu_1.ResetPasswordMenu();
                                return [3 /*break*/, 3];
                            case 8:
                                menuToNavigate = new ChangeLanguageMenu_1.ChangeLanguageMenu();
                                return [3 /*break*/, 3];
                            default:
                                console.log(i18next_1.default.t("err.msg"));
                                return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        rl.close();
                        if (!menuToNavigate) return [3 /*break*/, 5];
                        return [4 /*yield*/, menuToNavigate.start()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MainMenu.prototype.printMenuHeader = function () {
        console.log(i18next_1.default.t("main.menu.header"));
        if (!this.context.getLoggedInUser()) {
            console.log(i18next_1.default.t("menu.for.not.logged.in.user"));
        }
        else {
            console.log(i18next_1.default.t("menu.for.logged.in.user"));
        }
    };
    MainMenu.MENU_COMMAND = "menu";
    return MainMenu;
}());
exports.MainMenu = MainMenu;

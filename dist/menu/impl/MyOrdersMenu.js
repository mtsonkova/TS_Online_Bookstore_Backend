"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyOrdersMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const DefaultOrderManagementService_1 = require("src/services/impl/DefaultOrderManagementService");
const MainMenu_1 = require("src/menu/impl/MainMenu");
const i18next_1 = __importDefault(require("i18next"));
class MyOrdersMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.orderManagementService = DefaultOrderManagementService_1.DefaultOrderManagementService.getInstance();
    }
    start() {
        this.printMenuHeader();
        const user = this.context.getLoggedInUser();
        if (!user) {
            console.log(i18next_1.default.t("orders.not.logged.in")); // Add this key in your i18n resource
            new MainMenu_1.MainMenu().start();
            return;
        }
        this.printUserOrdersToConsole(user.getId());
        new MainMenu_1.MainMenu().start();
    }
    printUserOrdersToConsole(userId) {
        const orders = this.orderManagementService.getOrdersByUserId(userId);
        if (!orders || orders.length === 0) {
            console.log(i18next_1.default.t("orders.none")); // Add this key in your i18n resource
        }
        else {
            orders.forEach((order) => {
                console.log(order); // Customize display as needed
            });
        }
    }
    printMenuHeader() {
        console.log("***** " + i18next_1.default.t("orders.header") + " *****"); // i18n key: orders.header
    }
}
exports.MyOrdersMenu = MyOrdersMenu;

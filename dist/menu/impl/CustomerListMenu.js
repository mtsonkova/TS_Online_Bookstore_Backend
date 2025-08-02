"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerListMenu = void 0;
const ApplicationContext_1 = require("@src/configs/ApplicationContext");
const DefaultUserManagementService_1 = require("@src/services/impl/DefaultUserManagementService");
const i18next_1 = __importDefault(require("i18next"));
class CustomerListMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.userManagementService = DefaultUserManagementService_1.DefaultUserManagementService.getInstance();
    }
    start() {
        this.printMenuHeader();
        const users = this.userManagementService.getUsers();
        if (!users || users.length === 0) {
            console.log(i18next_1.default.t("no.users.msg")); // e.g. "No users found."
        }
        else {
            users.forEach((user) => {
                console.log(user); // Consider formatting user details here if needed
            });
        }
        this.context.getMainMenu()?.start();
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("customer.list.header")); // e.g. "Customer List"
    }
}
exports.CustomerListMenu = CustomerListMenu;

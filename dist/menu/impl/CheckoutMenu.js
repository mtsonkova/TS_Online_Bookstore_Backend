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
exports.CheckoutMenu = void 0;
const ApplicationContext_1 = require("@src/configs/ApplicationContext");
const DefaultOrder_1 = require("@src/entities/impl/DefaultOrder");
const DefaultOrderManagementService_1 = require("@src/services/impl/DefaultOrderManagementService");
const readline = __importStar(require("readline-sync"));
const MainMenu_1 = require("@src/menu/impl/MainMenu"); // assuming this exists
const messages_1 = require("@src/configs/messages"); // assuming a replacement for Java's ResourceBundle
class CheckoutMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.orderManagementService = DefaultOrderManagementService_1.DefaultOrderManagementService.getInstance();
        this.rb = messages_1.messages; // Replace with your actual i18n implementation
    }
    start() {
        while (true) {
            this.printMenuHeader();
            const userInput = readline.question();
            if (!this.createOrder(userInput)) {
                continue;
            }
            this.context.getSessionCart().clear();
            break;
        }
        console.log(this.rb["thank.you.msg"]);
        new MainMenu_1.MainMenu().start();
    }
    createOrder(creditCardNumber) {
        const order = new DefaultOrder_1.DefaultOrder();
        if (!order.isCreditCardNumberValid(creditCardNumber)) {
            return false;
        }
        order.setCreditCardNumber(creditCardNumber);
        order.setProducts(this.context.getSessionCart().getProducts());
        const loggedInUser = this.context.getLoggedInUser();
        if (!loggedInUser) {
            console.log("No logged in user found. Please log in first.");
            return false; // or handle appropriately
        }
        order.setCustomerId(loggedInUser.getId());
        this.orderManagementService.addOrder(order);
        return true;
    }
    printMenuHeader() {
        console.log(this.rb["checkout.menu.header"]);
        process.stdout.write(this.rb["enter.credit.card.number.cta"]);
    }
}
exports.CheckoutMenu = CheckoutMenu;

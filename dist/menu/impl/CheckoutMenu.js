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
exports.CheckoutMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const DefaultOrder_1 = require("src/entities/impl/DefaultOrder");
const DefaultOrderManagementService_1 = require("src/services/impl/DefaultOrderManagementService");
const readline = __importStar(require("readline-sync"));
const MainMenu_1 = require("src/menu/impl/MainMenu"); // assuming this exists
//import { messages } from "src/configs/messages"; // assuming a replacement for Java's ResourceBundle
const messages_en_json_1 = __importDefault(require("src/i18n/messages_en.json"));
class CheckoutMenu {
    //private rb: Record<string, string>;
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.orderManagementService = DefaultOrderManagementService_1.DefaultOrderManagementService.getInstance();
        //this.rb = messages; // Replace with your actual i18n implementation
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
        console.log(messages_en_json_1.default["thank.you.msg"]);
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
        console.log(messages_en_json_1.default["checkout.menu.header"]);
        process.stdout.write(messages_en_json_1.default["enter.credit.card.number.cta"]);
    }
}
exports.CheckoutMenu = CheckoutMenu;
// import { ApplicationContext } from "src/configs/ApplicationContext";
// import { Order } from "src/entities/entitiesInterfaces/Order";
// import { DefaultOrder } from "src/entities/impl/DefaultOrder";
// import { Menu } from "src/menu/Menu";
// import { OrderManagementService } from "src/services/OrderManagementService";
// import { DefaultOrderManagementService } from "src/services/impl/DefaultOrderManagementService";
// import { i18n } from "i18next"; // Assuming you have an i18n service
// import * as readline from "readline-sync";
// import { MainMenu } from "src/menu/impl/MainMenu";
// export class CheckoutMenu implements Menu {
//   private context: ApplicationContext;
//   private orderManagementService: OrderManagementService;
//   private i18n: I18nService;
//   constructor() {
//     this.context = ApplicationContext.getInstance();
//     this.orderManagementService = DefaultOrderManagementService.getInstance();
//     this.i18n = I18nService.getInstance(); // Use a proper i18n service
//   }
//   public start(): void {
//     let orderCreated = false;
//     while (!orderCreated) {
//       this.printMenuHeader();
//       const userInput: string = readline.question().trim();
//       // Allow user to go back
//       if (userInput.toLowerCase() === 'back' || userInput.toLowerCase() === 'exit') {
//         console.log(this.i18n.getMessage("checkout.cancelled"));
//         new MainMenu().start();
//         return;
//       }
//       const orderResult = this.createOrder(userInput);
//       if (orderResult.success) {
//         this.context.getSessionCart().clear();
//         orderCreated = true;
//         console.log(this.i18n.getMessage("order.success"));
//       } else {
//         console.log(orderResult.errorMessage);
//         console.log(this.i18n.getMessage("please.try.again"));
//       }
//     }
//     console.log(this.i18n.getMessage("thank.you.msg"));
//     new MainMenu().start();
//   }
//   private createOrder(creditCardNumber: string): { success: boolean; errorMessage?: string } {
//     // Validate logged-in user first
//     const loggedInUser = this.context.getLoggedInUser();
//     if (!loggedInUser) {
//       return {
//         success: false,
//         errorMessage: this.i18n.getMessage("error.no.logged.in.user")
//       };
//     }
//     // Validate cart is not empty
//     const cart = this.context.getSessionCart();
//     if (!cart.getProducts() || cart.getProducts().length === 0) {
//       return {
//         success: false,
//         errorMessage: this.i18n.getMessage("error.empty.cart")
//       };
//     }
//     // Create and validate order
//     const order: Order = new DefaultOrder();
//     if (!order.isCreditCardNumberValid(creditCardNumber)) {
//       return {
//         success: false,
//         errorMessage: this.i18n.getMessage("error.invalid.credit.card")
//       };
//     }
//     try {
//       order.setCreditCardNumber(creditCardNumber);
//       order.setProducts(cart.getProducts());
//       order.setCustomerId(loggedInUser.getId());
//       this.orderManagementService.addOrder(order);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         errorMessage: this.i18n.getMessage("error.order.processing", { error: error.message })
//       };
//     }
//   }
//   public printMenuHeader(): void {
//     console.log("\n" + "=".repeat(50));
//     console.log(this.i18n.getMessage("checkout.menu.header"));
//     console.log("=".repeat(50));
//     console.log(this.i18n.getMessage("checkout.instructions"));
//     process.stdout.write(this.i18n.getMessage("enter.credit.card.number.cta"));
//   }
// }
// // Example I18nService interface (you'll need to implement this)
// interface I18nService {
//   getMessage(key: string, params?: Record<string, any>): string;
//   setLocale(locale: string): void;
//   getCurrentLocale(): string;
// }
// // Example implementation of I18nService
// export class DefaultI18nService implements I18nService {
//   private static instance: DefaultI18nService;
//   private currentLocale: string = 'en';
//   private messages: Record<string, Record<string, string>> = {};
//   private constructor() {
//     this.loadMessages();
//   }
//   public static getInstance(): DefaultI18nService {
//     if (!DefaultI18nService.instance) {
//       DefaultI18nService.instance = new DefaultI18nService();
//     }
//     return DefaultI18nService.instance;
//   }
//   private async loadMessages(): Promise<void> {
//     try {
//       // Dynamically load messages based on locale
//       const messages = await import(`src/i18n/messages_${this.currentLocale}.json`);
//       this.messages[this.currentLocale] = messages.default;
//     } catch (error) {
//       console.warn(`Failed to load messages for locale: ${this.currentLocale}`);
//       // Fallback to English
//       const fallbackMessages = await import('src/i18n/messages_en.json');
//       this.messages[this.currentLocale] = fallbackMessages.default;
//     }
//   }
//   public getMessage(key: string, params?: Record<string, any>): string {
//     const message = this.messages[this.currentLocale]?.[key] || key;
//     if (params) {
//       return this.interpolate(message, params);
//     }
//     return message;
//   }
//   public setLocale(locale: string): void {
//     this.currentLocale = locale;
//     this.loadMessages();
//   }
//   public getCurrentLocale(): string {
//     return this.currentLocale;
//   }
//   private interpolate(message: string, params: Record<string, any>): string {
//     return message.replace(/\{(\w+)\}/g, (match, key) => {
//       return params[key] !== undefined ? String(params[key]) : match;
//     });
//   }
// }

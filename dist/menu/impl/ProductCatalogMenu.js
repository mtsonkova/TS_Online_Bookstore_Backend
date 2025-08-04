"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCatalogMenu = void 0;
const ApplicationContext_1 = require("./configs/ApplicationContext");
const DefaultProductManagementService_1 = require("./services/impl/DefaultProductManagementService");
const i18next_1 = __importDefault(require("i18next"));
const MainMenu_1 = require("./menu/impl/MainMenu"); // adjust paths as needed
const CheckoutMenu_1 = require("./menu/impl/CheckoutMenu");
class ProductCatalogMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.productManagementService = DefaultProductManagementService_1.DefaultProductManagementService.getInstance();
    }
    async start() {
        let menuToNavigate = null;
        while (true) {
            this.printMenuHeader();
            this.printProductsToConsole();
            const userInput = await this.readUserInput();
            const user = this.context.getLoggedInUser();
            if (!user) {
                console.log(i18next_1.default.t("not.logged.in.msg"));
                menuToNavigate = new MainMenu_1.MainMenu();
                break;
            }
            if (userInput.toLowerCase() === MainMenu_1.MainMenu.MENU_COMMAND.toLowerCase()) {
                menuToNavigate = new MainMenu_1.MainMenu();
                break;
            }
            if (userInput.toLowerCase() === ProductCatalogMenu.CHECKOUT_COMMAND) {
                const sessionCart = this.context.getSessionCart();
                if (!sessionCart || sessionCart.isEmpty()) {
                    console.log(i18next_1.default.t("empty.cart.err.msg"));
                }
                else {
                    menuToNavigate = new CheckoutMenu_1.CheckoutMenu();
                    break;
                }
            }
            else {
                const productToAddToCart = this.fetchProduct(userInput);
                if (!productToAddToCart) {
                    console.log(i18next_1.default.t("enter.product.id"));
                    continue;
                }
                this.processAddToCart(productToAddToCart);
            }
        }
        menuToNavigate?.start();
    }
    printMenuHeader() {
        console.log(i18next_1.default.t("product.catalog.header"));
        console.log(i18next_1.default.t("catalog.cta"));
    }
    async readUserInput() {
        return new Promise((resolve) => {
            const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            readline.question(i18next_1.default.t("proceed.to.checkout") + " ", (answer) => {
                readline.close();
                resolve(answer.trim());
            });
        });
    }
    printProductsToConsole() {
        const products = this.productManagementService.getProducts();
        if (products && products.length > 0) {
            for (const product of products) {
                console.log(product.toString()); // Ensure Product has a .toString() method or format it manually
            }
        }
    }
    fetchProduct(userInput) {
        const productId = parseInt(userInput, 10);
        if (isNaN(productId))
            return null;
        return this.productManagementService.getProductById(productId) || null;
    }
    processAddToCart(product) {
        this.context.getSessionCart().addProduct(product);
        console.log(i18next_1.default.t("product.added.to.cart", { productName: product.getProductName() }));
    }
}
exports.ProductCatalogMenu = ProductCatalogMenu;
ProductCatalogMenu.CHECKOUT_COMMAND = "checkout";

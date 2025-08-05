"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContext = void 0;
const DefaultCart_1 = require("src/entities/impl/DefaultCart");
class ApplicationContext {
    // Private constructor (like Java)
    constructor() {
        this.loggedInUser = null;
        this.mainMenu = null;
        this.sessionCart = null;
    }
    setLoggedInUser(user) {
        if (this.sessionCart != null) {
            this.sessionCart.clear(); // we have to clear session cart when new user is logged in
        }
        this.loggedInUser = user;
    }
    getLoggedInUser() {
        return this.loggedInUser;
    }
    setMainMenu(menu) {
        this.mainMenu = menu;
    }
    getMainMenu() {
        return this.mainMenu;
    }
    // This matches the Java behavior exactly
    static getInstance() {
        if (ApplicationContext.instance == null) {
            ApplicationContext.instance = new ApplicationContext();
        }
        return ApplicationContext.instance;
    }
    getSessionCart() {
        if (this.sessionCart == null) {
            this.sessionCart = new DefaultCart_1.DefaultCart();
        }
        return this.sessionCart;
    }
}
exports.ApplicationContext = ApplicationContext;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContext = void 0;
const DefaultCart_1 = require("src/entities/impl/DefaultCart");
class ApplicationContext {
    constructor(loggedInUser = null, mainMenu = null, sessionCart = null) {
        this.loggedInUser = null;
        this.mainMenu = null;
        this.sessionCart = null;
        this.loggedInUser = loggedInUser;
        this.mainMenu = mainMenu;
        this.sessionCart = sessionCart;
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
    static getInstance() {
        if (!this.instance) {
            throw new Error("ApplicationContext has not been initialized.");
        }
        return this.instance;
    }
    static initialize(loggedInUser, mainMenu, sessionCart) {
        if (!this.instance) {
            this.instance = new ApplicationContext(loggedInUser, mainMenu, sessionCart);
        }
    }
    getSessionCart() {
        if (this.sessionCart == null) {
            this.sessionCart = new DefaultCart_1.DefaultCart();
        }
        return this.sessionCart;
    }
}
exports.ApplicationContext = ApplicationContext;

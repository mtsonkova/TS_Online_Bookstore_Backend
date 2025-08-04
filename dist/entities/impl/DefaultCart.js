"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCart = void 0;
class DefaultCart {
    constructor() {
        this.products = [];
    }
    isEmpty() {
        return (this.products.length === 0);
    }
    addProduct(product) {
        if (product == null) {
            return;
        }
        this.products.push(product);
    }
    getProducts() {
        return this.products;
    }
    clear() {
        this.products = [];
    }
}
exports.DefaultCart = DefaultCart;

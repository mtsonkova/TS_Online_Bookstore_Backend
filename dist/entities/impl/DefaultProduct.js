"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProduct = void 0;
class DefaultProduct {
    constructor(id, productName, categoryName, price) {
        this.id = id ?? 0;
        this.productName = productName ?? '';
        this.categoryName = categoryName ?? '';
        this.price = price ?? 0;
    }
    toString() {
        return "Product id=" + this.id + ", product name=" + this.productName
            + ", category name=" + this.categoryName + ", price=" + this.price;
    }
    getId() {
        return this.id;
    }
    getProductName() {
        return this.productName;
    }
    getCategoryName() {
        return this.categoryName;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
}
exports.DefaultProduct = DefaultProduct;

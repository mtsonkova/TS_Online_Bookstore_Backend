"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableProduct = void 0;
class ComparableProduct {
    constructor(id, productName, categoryName, price) {
        this.id = id ?? 0;
        this.productName = productName ?? "";
        this.categoryName = categoryName ?? "";
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
        if (price < 0) {
            throw new Error("Price cannot be negative");
        }
        this.price = price;
    }
    compareTo(otherProduct) {
        return this.id - otherProduct.getId();
    }
}
exports.ComparableProduct = ComparableProduct;

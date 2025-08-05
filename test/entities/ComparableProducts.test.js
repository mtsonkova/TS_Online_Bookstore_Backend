"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComparableProduct_1 = require("src/entities/impl/ComparableProduct");
let comparableProduct = new ComparableProduct_1.ComparableProduct(1, 'Lenovo Laptop', 'computers', 3620.59);
let secondComparableProduct = new ComparableProduct_1.ComparableProduct();
describe('Test Comparable Product methods', () => {
    test('Should validate toString method', () => {
        const text = 'Product id=1, product name=Lenovo Laptop, category name=computers, price=3620.59';
        expect(comparableProduct.toString()).toContain(text);
    });
    test('Should validate getId method', () => {
        expect(comparableProduct.getId()).toEqual(1);
    });
    test('Should vaidate getProductName method', () => {
        expect(comparableProduct.getProductName()).toBe('Lenovo Laptop');
    });
    test('Should validate getCategoryName method', () => {
        expect(comparableProduct.getCategoryName()).toBe('computers');
    });
    test('Should validate getPrice method', () => {
        expect(comparableProduct.getPrice()).toEqual(3620.59);
    });
    test('Should vaidate setPrice with positive price', () => {
        comparableProduct.setPrice(2500);
        let currentPrice = comparableProduct.getPrice();
        expect(currentPrice).toEqual(2500);
    });
    test('Should validate setPrice with negative price', () => {
        expect(() => comparableProduct.setPrice(-5000)).toThrow('Price cannot be negative');
    });
    test('Should validate compare product', () => {
        let idDifference = secondComparableProduct.compareTo(comparableProduct);
        expect(idDifference).toEqual(-1);
    });
});

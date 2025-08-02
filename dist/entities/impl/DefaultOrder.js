"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrder = void 0;
class DefaultOrder {
    constructor() {
        this.AMOUNT_OF_DIGITS_IN_CREDIT_CARD_NUMBER = 16;
    }
    isCreditCardNumberValid(creditCardNumber) {
        return creditCardNumber.length === this.AMOUNT_OF_DIGITS_IN_CREDIT_CARD_NUMBER &&
            !creditCardNumber.includes(" ") &&
            Number(creditCardNumber) > 0;
    }
    setCreditCardNumber(creditCardNumber) {
        if (creditCardNumber == null) {
            return;
        }
        this.creditCardNumber = creditCardNumber;
    }
    setProducts(products) {
        this.products = [...products];
    }
    setCustomerId(customerId) {
        this.customerId = customerId;
    }
    getCustomerId() {
        return this.customerId;
    }
    toString() {
        return "Order: customer id - " + this.customerId + "\t" +
            "credit card number - " + this.creditCardNumber + "\t" +
            "products - " + this.products;
    }
}
exports.DefaultOrder = DefaultOrder;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProductManagementService = void 0;
const DefaultProduct_1 = require("@src/entities/impl/DefaultProduct");
const DefaultProductStoringService_1 = require("@src/storage/impl/DefaultProductStoringService");
class DefaultProductManagementService {
    static initialize() {
        DefaultProductManagementService.loadProductsFromStorage();
        return true;
    }
    static loadProductsFromStorage() {
        this.products = this.productStoringService.loadProducts();
    }
    /**
     * @deprecated use loadProductsFromStorage instead
     */
    static initProducts() {
        this.products = [
            new DefaultProduct_1.DefaultProduct(1, "Hardwood Oak Suffolk Internal Door", "Doors", 109.99),
            new DefaultProduct_1.DefaultProduct(2, "Oregon Cottage Interior Oak Door", "Doors", 179.99),
            new DefaultProduct_1.DefaultProduct(3, "Oregon Cottage Horizontal Interior White Oak Door", "Doors", 189.99),
            new DefaultProduct_1.DefaultProduct(4, "4 Panel Oak Deco Interior Door", "Doors", 209.09),
            new DefaultProduct_1.DefaultProduct(5, "Worcester 2000 30kW Ng Combi Boiler Includes Free Comfort+ II controller", "Boilers", 989.99),
            new DefaultProduct_1.DefaultProduct(6, "Glow-worm Betacom 4 30kW Combi Gas Boiler ERP", "Boilers", 787.99),
            new DefaultProduct_1.DefaultProduct(7, "Worcester 2000 25kW Ng Combi Boiler with Free Comfort+ II controller", "Boilers", 859.99),
            new DefaultProduct_1.DefaultProduct(8, "Wienerberger Terca Class B Engineering Brick Red 215mm x 102.5mm x 65mm (Pack of 504)", "Bricks", 402.99),
            new DefaultProduct_1.DefaultProduct(9, "Wienerberger Terca Engineering Brick Blue Perforated Class B 65mm (Pack of 400)", "Bricks", 659.99),
            new DefaultProduct_1.DefaultProduct(10, "Wienerberger Engineering Brick Red Smooth Class B 73mm - Pack of 368", "Bricks", 523.99)
        ];
    }
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DefaultProductManagementService();
        }
        return this.instance;
    }
    getProducts() {
        return DefaultProductManagementService.products;
    }
    getProductById(productIdToAddToCart) {
        for (const product of DefaultProductManagementService.products) {
            if (product && product.getId() === productIdToAddToCart) {
                return product;
            }
        }
        return null;
    }
}
exports.DefaultProductManagementService = DefaultProductManagementService;
DefaultProductManagementService.products = [];
DefaultProductManagementService.productStoringService = new DefaultProductStoringService_1.DefaultProductStoringService();
// Simulate static block
DefaultProductManagementService.initialized = DefaultProductManagementService.initialize();

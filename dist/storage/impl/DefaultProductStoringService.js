"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProductStoringService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DefaultProduct_1 = require("./entities/impl/DefaultProduct");
class DefaultProductStoringService {
    loadProducts() {
        console.log(`Products.csv path: ${path_1.default.join(DefaultProductStoringService.RESOURCES_FOLDER, DefaultProductStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultProductStoringService.PRODUCTS_INFO_STORAGE)}`);
        const filePath = path_1.default.join(DefaultProductStoringService.RESOURCES_FOLDER, DefaultProductStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultProductStoringService.PRODUCTS_INFO_STORAGE);
        try {
            const fileContent = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
            const lines = fileContent.split("\n");
            return lines
                .filter(line => line.trim().length > 0)
                .map(line => {
                const productElements = line.split(",");
                return new DefaultProduct_1.DefaultProduct(Number(productElements[DefaultProductStoringService.PRODUCT_ID_INDEX]), productElements[DefaultProductStoringService.PRODUCT_NAME_INDEX], productElements[DefaultProductStoringService.PRODUCT_CATEGORY_INDEX], parseFloat(productElements[DefaultProductStoringService.PRODUCT_PRICE_INDEX]));
            });
        }
        catch (err) {
            console.error("Failed to load products:", err);
            return [];
        }
    }
}
exports.DefaultProductStoringService = DefaultProductStoringService;
DefaultProductStoringService.PRODUCTS_INFO_STORAGE = "products.csv";
DefaultProductStoringService.CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
DefaultProductStoringService.RESOURCES_FOLDER = "resources";
DefaultProductStoringService.PRODUCT_PRICE_INDEX = 3;
DefaultProductStoringService.PRODUCT_CATEGORY_INDEX = 2;
DefaultProductStoringService.PRODUCT_NAME_INDEX = 1;
DefaultProductStoringService.PRODUCT_ID_INDEX = 0;

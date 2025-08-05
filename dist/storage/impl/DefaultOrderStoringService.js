"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrderStoringService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DefaultOrderStoringService {
    constructor() { }
    saveOrders(orders) {
        const filePath = path_1.default.join(DefaultOrderStoringService.RESOURCES_FOLDER, DefaultOrderStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultOrderStoringService.ORDERS_DATA_FILE_NAME);
        try {
            fs_1.default.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
        }
        catch (error) {
            console.error("Error saving orders:", error);
        }
    }
    loadOrders() {
        const filePath = path_1.default.join(DefaultOrderStoringService.RESOURCES_FOLDER, DefaultOrderStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultOrderStoringService.ORDERS_DATA_FILE_NAME);
        try {
            if (!fs_1.default.existsSync(filePath)) {
                return [];
            }
            const data = fs_1.default.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error("Error loading orders:", error);
            return null;
        }
    }
    static getInstance() {
        if (!DefaultOrderStoringService.instance) {
            DefaultOrderStoringService.instance = new DefaultOrderStoringService();
        }
        return DefaultOrderStoringService.instance;
    }
}
exports.DefaultOrderStoringService = DefaultOrderStoringService;
DefaultOrderStoringService.ORDERS_DATA_FILE_NAME = "orders.data.json";
DefaultOrderStoringService.CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
DefaultOrderStoringService.RESOURCES_FOLDER = "resources";

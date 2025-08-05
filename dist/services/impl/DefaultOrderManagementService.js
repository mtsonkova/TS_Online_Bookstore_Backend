"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOrderManagementService = void 0;
const DefaultOrderStoringService_1 = require("src/storage/impl/DefaultOrderStoringService");
class DefaultOrderManagementService {
    constructor() {
        this.orders = [];
        this.orderStoringService = DefaultOrderStoringService_1.DefaultOrderStoringService.getInstance();
        this.orders = this.orderStoringService.loadOrders() ?? [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DefaultOrderManagementService();
        }
        return this.instance;
    }
    addOrder(order) {
        if (!order)
            return;
        this.orders.push(order);
        this.orderStoringService.saveOrders(this.orders);
    }
    getOrdersByUserId(userId) {
        return (this.orderStoringService.loadOrders() ?? [])
            .filter((order) => order && this.getOrderCustomerId(order) === userId);
    }
    getOrderCustomerId(order) {
        // Handle both class instances with methods and plain objects from JSON
        if (typeof order.getCustomerId === 'function') {
            return order.getCustomerId();
        }
        // Fallback to property access for plain objects
        return order.customerId;
    }
    getOrders() {
        if (!this.orders || this.orders.length === 0) {
            this.orders = this.orderStoringService.loadOrders() ?? [];
        }
        return this.orders;
    }
    clearServiceState() {
        this.orders = [];
    }
}
exports.DefaultOrderManagementService = DefaultOrderManagementService;

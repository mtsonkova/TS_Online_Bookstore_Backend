import { Order } from "./entities/entitiesInterfaces/Order";
import { OrderManagementService } from "./services/OrderManagementService";
import { OrderStoringService } from "./storage/OrderStoringService";
import { DefaultOrderStoringService } from "./storage/impl/DefaultOrderStoringService";

export class DefaultOrderManagementService implements OrderManagementService {
  private static instance: DefaultOrderManagementService;
  private orders: Order[] = [];
  private orderStoringService: OrderStoringService;

  private constructor() {
    this.orderStoringService = DefaultOrderStoringService.getInstance();
    this.orders = this.orderStoringService.loadOrders() ?? [];
  }

  public static getInstance(): OrderManagementService {
    if (!this.instance) {
      this.instance = new DefaultOrderManagementService();
    }
    return this.instance;
  }

  public addOrder(order: Order): void {
    if (!order) return;

    this.orders.push(order);
    this.orderStoringService.saveOrders(this.orders);
  }

  public getOrdersByUserId(userId: number): Order[] {
  return (this.orderStoringService.loadOrders() ?? []).filter(
    (order) => order.getCustomerId() === userId
  );
}

  public getOrders(): Order[] {
    if (!this.orders || this.orders.length === 0) {
      this.orders = this.orderStoringService.loadOrders()?? [];
    }
    return this.orders;
  }

  public clearServiceState(): void {
    this.orders = [];
  }
}

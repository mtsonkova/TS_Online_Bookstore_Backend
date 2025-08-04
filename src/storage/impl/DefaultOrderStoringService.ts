import fs from "fs";
import path from "path";
import { Order } from "./entities/entitiesInterfaces/Order";
import { OrderStoringService } from "./storage/OrderStoringService";

export class DefaultOrderStoringService implements OrderStoringService {
  private static readonly ORDERS_DATA_FILE_NAME = "orders.data.json";
  private static readonly CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
  private static readonly RESOURCES_FOLDER = "resources";

  private static instance: DefaultOrderStoringService;

  private constructor() {}

  public saveOrders(orders: Order[]): void {
    const filePath = path.join(
      DefaultOrderStoringService.RESOURCES_FOLDER,
      DefaultOrderStoringService.CURRENT_TASK_RESOURCE_FOLDER,
      DefaultOrderStoringService.ORDERS_DATA_FILE_NAME
    );

    try {
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  }

  public loadOrders(): Order[] | null {
    const filePath = path.join(
      DefaultOrderStoringService.RESOURCES_FOLDER,
      DefaultOrderStoringService.CURRENT_TASK_RESOURCE_FOLDER,
      DefaultOrderStoringService.ORDERS_DATA_FILE_NAME
    );

    try {
      if (!fs.existsSync(filePath)) {
        return [];
      }

      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as Order[];
    } catch (error) {
      console.error("Error loading orders:", error);
      return null;
    }
  }

  public static getInstance(): OrderStoringService {
    if (!DefaultOrderStoringService.instance) {
      DefaultOrderStoringService.instance = new DefaultOrderStoringService();
    }
    return DefaultOrderStoringService.instance;
  }
}

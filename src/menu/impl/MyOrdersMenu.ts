import { ApplicationContext } from "./configs/ApplicationContext";
import { Order } from "./entities/entitiesInterfaces/Order";
import { Menu } from "./menu/Menu";
import { OrderManagementService } from "./services/OrderManagementService";
import { DefaultOrderManagementService } from "./services/impl/DefaultOrderManagementService";
import { MainMenu } from "./menu/impl/MainMenu";
import i18n from "i18next";

export class MyOrdersMenu implements Menu {
  private context: ApplicationContext;
  private orderManagementService: OrderManagementService;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.orderManagementService = DefaultOrderManagementService.getInstance();
  }

  public start(): void {
    this.printMenuHeader();

    const user = this.context.getLoggedInUser();
    if (!user) {
      console.log(i18n.t("orders.not.logged.in")); // Add this key in your i18n resource
      new MainMenu().start();
      return;
    }

    this.printUserOrdersToConsole(user.getId());
    new MainMenu().start();
  }

  private printUserOrdersToConsole(userId: number): void {
    const orders: Order[] = this.orderManagementService.getOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      console.log(i18n.t("orders.none")); // Add this key in your i18n resource
    } else {
      orders.forEach((order: Order) => {
        console.log(order); // Customize display as needed
      });
    }
  }

  public printMenuHeader(): void {
    console.log("***** " + i18n.t("orders.header") + " *****"); // i18n key: orders.header
  }
}

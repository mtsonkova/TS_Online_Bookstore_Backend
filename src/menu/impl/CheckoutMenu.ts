import { ApplicationContext } from "@src/configs/ApplicationContext";
import { Order } from "@src/entities/entitiesInterfaces/Order";
import { DefaultOrder } from "@src/entities/impl/DefaultOrder";
import { Menu } from "@src/menu/Menu";
import { OrderManagementService } from "@src/services/OrderManagementService";
import { DefaultOrderManagementService } from "@src/services/impl/DefaultOrderManagementService";
import * as readline from "readline-sync";
import { MainMenu } from "@src/menu/impl/MainMenu"; // assuming this exists
import { messages } from "@src/configs/messages"; // assuming a replacement for Java's ResourceBundle

export class CheckoutMenu implements Menu {
  private context: ApplicationContext;
  private orderManagementService: OrderManagementService;
  private rb: Record<string, string>;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.orderManagementService = DefaultOrderManagementService.getInstance();
    this.rb = messages; // Replace with your actual i18n implementation
  }

  public start(): void {
    while (true) {
      this.printMenuHeader();
      const userInput: string = readline.question();

      if (!this.createOrder(userInput)) {
        continue;
      }

      this.context.getSessionCart().clear();
      break;
    }

    console.log(this.rb["thank.you.msg"]);
    new MainMenu().start();
  }

  private createOrder(creditCardNumber: string): boolean {
    const order: Order = new DefaultOrder();

    if (!order.isCreditCardNumberValid(creditCardNumber)) {
      return false;
    }

    order.setCreditCardNumber(creditCardNumber);
    order.setProducts(this.context.getSessionCart().getProducts());
    const loggedInUser = this.context.getLoggedInUser();

if (!loggedInUser) {
  console.log("No logged in user found. Please log in first.");
  return false; // or handle appropriately
}

order.setCustomerId(loggedInUser.getId());

    this.orderManagementService.addOrder(order);
    return true;
  }

  public printMenuHeader(): void {
    console.log(this.rb["checkout.menu.header"]);
    process.stdout.write(this.rb["enter.credit.card.number.cta"]);
  }
}

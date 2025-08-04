import { ApplicationContext } from "./configs/ApplicationContext";
import { Order } from "./entities/entitiesInterfaces/Order";
import { DefaultOrder } from "./entities/impl/DefaultOrder";
import { Menu } from "./menu/Menu";
import { OrderManagementService } from "./services/OrderManagementService";
import { DefaultOrderManagementService } from "./services/impl/DefaultOrderManagementService";
import * as readline from "readline-sync";
import { MainMenu } from "./menu/impl/MainMenu"; // assuming this exists
import { messages } from "./configs/messages"; // assuming a replacement for Java's ResourceBundle

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

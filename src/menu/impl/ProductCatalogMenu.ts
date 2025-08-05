import { ApplicationContext } from "src/configs/ApplicationContext";
import { Cart } from "src/entities/entitiesInterfaces/Cart";
import { Product } from "src/entities/entitiesInterfaces/Product";
import { Menu } from "src/menu/Menu";
import { ProductManagementService } from "src/services/ProductManagementService";
import { DefaultProductManagementService } from "src/services/impl/DefaultProductManagementService";
import i18n from "i18next";
import { MainMenu } from "src/menu/impl/MainMenu"; // adjust paths as needed
import { CheckoutMenu } from "src/menu/impl/CheckoutMenu";

export class ProductCatalogMenu implements Menu {
  private static readonly CHECKOUT_COMMAND = "checkout";
  private context: ApplicationContext;
  private productManagementService: ProductManagementService;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.productManagementService = DefaultProductManagementService.getInstance();
  }

  async start(): Promise<void> {
    let menuToNavigate: Menu | null = null;

    while (true) {
      this.printMenuHeader();
      this.printProductsToConsole();

      const userInput = await this.readUserInput();

      const user = this.context.getLoggedInUser();
      if (!user) {
        console.log(i18n.t("not.logged.in.msg"));
        menuToNavigate = new MainMenu();
        break;
      }

      if (userInput.toLowerCase() === MainMenu.MENU_COMMAND.toLowerCase()) {
        menuToNavigate = new MainMenu();
        break;
      }

      if (userInput.toLowerCase() === ProductCatalogMenu.CHECKOUT_COMMAND) {
        const sessionCart = this.context.getSessionCart();
        if (!sessionCart || sessionCart.isEmpty()) {
          console.log(i18n.t("empty.cart.err.msg"));
        } else {
          menuToNavigate = new CheckoutMenu();
          break;
        }
      } else {
        const productToAddToCart = this.fetchProduct(userInput);

        if (!productToAddToCart) {
          console.log(i18n.t("enter.product.id"));
          continue;
        }

        this.processAddToCart(productToAddToCart);
      }
    }

    menuToNavigate?.start();
  }

  printMenuHeader(): void {
    console.log(i18n.t("product.catalog.header"));
    console.log(i18n.t("catalog.cta"));
  }

  private async readUserInput(): Promise<string> {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question(i18n.t("proceed.to.checkout") + " ", (answer: string) => {
        readline.close();
        resolve(answer.trim());
      });
    });
  }

  private printProductsToConsole(): void {
    const products = this.productManagementService.getProducts();
    if (products && products.length > 0) {
      for (const product of products) {
        console.log(product.toString()); // Ensure Product has a .toString() method or format it manually
      }
    }
  }

  private fetchProduct(userInput: string): Product | null {
    const productId = parseInt(userInput, 10);
    if (isNaN(productId)) return null;
    return this.productManagementService.getProductById(productId) || null;
  }

  private processAddToCart(product: Product): void {
    this.context.getSessionCart().addProduct(product);
    console.log(i18n.t("product.added.to.cart", { productName: product.getProductName() }));
  }
}

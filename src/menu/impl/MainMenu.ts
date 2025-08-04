import { ApplicationContext } from "src/configs/ApplicationContext";
import { Menu } from "src/menu/Menu";
import { Main } from "src/index"; // Import Main to access EXIT_COMMAND
import * as readline from "readline";
import i18n from "i18next";

import { SignUpMenu } from "src/menu/impl/SignUpMenu";
import { SignInMenu } from "src/menu/impl/SignInMenu";
import { SignOutMenu } from "src/menu/impl/SignOutMenu";
import { ProductCatalogMenu } from "src/menu/impl/ProductCatalogMenu";
import { MyOrdersMenu } from "src/menu/impl/MyOrdersMenu";
import { SettingsMenu } from "src/menu/impl/SettingsMenu";
import { CustomerListMenu } from "src/menu/impl/CustomerListMenu";
import { ResetPasswordMenu } from "src/menu/impl/ResetPasswordMenu";
import { ChangeLanguageMenu } from "src/menu/impl/ChangeLanguageMenu";

export class MainMenu implements Menu {
  public static readonly MENU_COMMAND = "menu";

  private static readonly MAIN_MENU_TEXT_FOR_LOGGED_OUT_USER = 
    "Please, enter number in console to proceed.\n" +
    "1. Sign Up\n" +
    "2. Sign In\n" +
    "3. Product Catalog\n" +
    "4. My Orders\n" +
    "5. Settings\n" +
    "6. Customer List";

  private static readonly MAIN_MENU_TEXT_FOR_LOGGED_IN_USER = 
    "Please, enter number in console to proceed.\n" +
    "1. Sign Up\n" +
    "2. Sign Out\n" +
    "3. Product Catalog\n" +
    "4. My Orders\n" +
    "5. Settings\n" +
    "6. Customer List";

  private context: ApplicationContext;

  constructor() {
    this.context = ApplicationContext.getInstance();
  }

  async start(): Promise<void> {
    if (!this.context.getMainMenu()) {
      this.context.setMainMenu(this);
    }

    let menuToNavigate: Menu | null = null;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    mainLoop: while (true) {
      this.printMenuHeader();

      const userInput = await new Promise<string>((resolve) =>
        rl.question("User input: ", resolve)
      );

      // Check for exit command (like Java version)
      if (userInput.toLowerCase() === Main.EXIT_COMMAND.toLowerCase()) {
        rl.close();
        process.exit(0);
      }

      const commandNumber = parseInt(userInput, 10);
      if (isNaN(commandNumber)) {
        console.log("Only 1, 2, 3, 4, 5, 6 is allowed. Try one more time");
        continue mainLoop;
      }

      switch (commandNumber) {
        case 1:
          menuToNavigate = new SignUpMenu();
          break mainLoop;
        case 2:
          if (this.context.getLoggedInUser() === null) {
            menuToNavigate = new SignInMenu();
          } else {
            menuToNavigate = new SignOutMenu();
          }
          break mainLoop;
        case 3:
          menuToNavigate = new ProductCatalogMenu();
          break mainLoop;
        case 4:
          menuToNavigate = new MyOrdersMenu();
          break mainLoop;
        case 5:
          menuToNavigate = new SettingsMenu();
          break mainLoop;
        case 6:
          menuToNavigate = new CustomerListMenu();
          break mainLoop;
        default:
          console.log("Only 1, 2, 3, 4, 5, 6 is allowed. Try one more time");
          continue mainLoop;
      }
    }

    rl.close();

    if (menuToNavigate) {
      await menuToNavigate.start();
    }
  }

  printMenuHeader(): void {
    console.log("***** MAIN MENU *****");
    if (this.context.getLoggedInUser() === null) {
      console.log(MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_OUT_USER);
    } else {
      console.log(MainMenu.MAIN_MENU_TEXT_FOR_LOGGED_IN_USER);
    }
  }
}
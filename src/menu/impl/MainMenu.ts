import { ApplicationContext } from "@src/configs/ApplicationContext";
import { Menu } from "@src/menu/Menu";
import * as readline from "readline";
import i18n from "i18next";

import { SignUpMenu } from "@src/menu/impl/SignUpMenu";
import { SignInMenu } from "@src/menu/impl/SignInMenu";
import { SignOutMenu } from "@src/menu/impl/SignOutMenu";
import { ProductCatalogMenu } from "@src/menu/impl/ProductCatalogMenu";
import { MyOrdersMenu } from "@src/menu/impl/MyOrdersMenu";
import { SettingsMenu } from "@src/menu/impl/SettingsMenu";
import { CustomerListMenu } from "@src/menu/impl/CustomerListMenu";
import { ResetPasswordMenu } from "@src/menu/impl/ResetPasswordMenu";
import { ChangeLanguageMenu } from "@src/menu/impl/ChangeLanguageMenu";

export class MainMenu implements Menu {
  public static readonly MENU_COMMAND = "menu";
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
        rl.question(i18n.t("user.input") + " ", resolve)
      );

      if (userInput.toLowerCase() === MainMenu.MENU_COMMAND) {
        rl.close();
        process.exit(0);
      }

      const commandNumber = parseInt(userInput, 10);
      if (isNaN(commandNumber)) {
        console.log(i18n.t("err.msg"));
        continue mainLoop;
      }

      switch (commandNumber) {
        case 1:
          menuToNavigate = new SignUpMenu();
          break mainLoop;
        case 2:
          menuToNavigate = this.context.getLoggedInUser()
            ? new SignOutMenu()
            : new SignInMenu();
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
        case 7:
          menuToNavigate = new ResetPasswordMenu();
          break mainLoop;
        case 8:
          menuToNavigate = new ChangeLanguageMenu();
          break mainLoop;
        default:
          console.log(i18n.t("err.msg"));
          continue mainLoop;
      }
    }

    rl.close();

    if (menuToNavigate) {
      await menuToNavigate.start();
    }
  }

  printMenuHeader(): void {
    console.log(i18n.t("main.menu.header"));
    if (!this.context.getLoggedInUser()) {
      console.log(i18n.t("menu.for.not.logged.in.user"));
    } else {
      console.log(i18n.t("menu.for.logged.in.user"));
    }
  }
}

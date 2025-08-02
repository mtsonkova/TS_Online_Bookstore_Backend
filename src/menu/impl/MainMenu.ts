// import com.itbulls.learnit.javacore.exam.solution.Main;

import { ApplicationContext } from "@src/configs/ApplicationContext";
import { Menu } from "@src/menu/Menu";
import * as readline from "readline";

export class MainMenu implements Menu {
  public static readonly MENU_COMMAND = "menu";
  private rb: Record<string, string>;
  private context: ApplicationContext;

  constructor() {
    this.context = ApplicationContext.getInstance();
    // Assuming you have some localization json or object instead of ResourceBundle
    this.rb = this.loadResourceBundle("RESOURCE_BUNDLE_BASE_NAME");
  }

  private loadResourceBundle(bundleName: string): Record<string, string> {
    // Dummy implementation: replace with your localization loader
    // For example, load a JSON file or object
    return {
      "user.input": "Please enter your command: ",
      "err.msg": "Invalid input. Try again.",
      "main.menu.header": "=== Main Menu ===",
      "menu.for.not.logged.in.user": "You are not logged in.",
      "menu.for.logged.in.user": "Welcome back, user!",
    };
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
        rl.question(this.rb["user.input"], resolve)
      );

      if (userInput.toLowerCase() === MainMenu.MENU_COMMAND) {
        process.exit(0);
      }

      const commandNumber = parseInt(userInput, 10);
      if (isNaN(commandNumber)) {
        console.log(this.rb["err.msg"]);
        continue mainLoop;
      }

      switch (commandNumber) {
        case 1:
          menuToNavigate = new SignUpMenu();
          break mainLoop;
        case 2:
          if (!this.context.getLoggedInUser()) {
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
        case 7:
          menuToNavigate = new ResetPasswordMenu();
          break mainLoop;
        case 8:
          menuToNavigate = new ChangeLanguageMenu();
          break mainLoop;
        default:
          console.log(this.rb["err.msg"]);
          continue mainLoop;
      }
    }

    rl.close();

    if (menuToNavigate) {
      await menuToNavigate.start();
    }
  }

  printMenuHeader(): void {
    console.log(this.rb["main.menu.header"]);
    if (!this.context.getLoggedInUser()) {
      console.log(this.rb["menu.for.not.logged.in.user"]);
    } else {
      console.log(this.rb["menu.for.logged.in.user"]);
    }
  }
}

// Stub classes for other menus referenced in switch statement
class SignUpMenu implements Menu {
  async start() { /*...*/ }
}
class SignInMenu implements Menu {
  async start() { /*...*/ }
}
class SignOutMenu implements Menu {
  async start() { /*...*/ }
}
class ProductCatalogMenu implements Menu {
  async start() { /*...*/ }
}
class MyOrdersMenu implements Menu {
  async start() { /*...*/ }
}
class SettingsMenu implements Menu {
  async start() { /*...*/ }
}
class CustomerListMenu implements Menu {
  async start() { /*...*/ }
}
class ResetPasswordMenu implements Menu {
  async start() { /*...*/ }
}
class ChangeLanguageMenu implements Menu {
  async start() { /*...*/ }
}

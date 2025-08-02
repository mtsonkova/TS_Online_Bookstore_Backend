import { ApplicationContext } from "@src/configs/ApplicationContext";
import { Menu } from "@src/menu/Menu";
import i18n from "i18next";
import { MainMenu } from "@src/menu/impl/MainMenu"; // Adjust path as needed
import { ChangePasswordMenu } from "@src/menu/impl/ChangePasswordMenu"; // Adjust path as needed
import { ChangeEmailMenu } from "@src/menu/impl/ChangeEmailMenu"; // Adjust path as needed

export class SettingsMenu implements Menu {
  private context: ApplicationContext;

  constructor() {
    this.context = ApplicationContext.getInstance();
  }

  async start(): Promise<void> {
    let menuToNavigate: Menu | null = null;

    mainLoop: while (true) {
      this.printMenuHeader();

      if (this.context.getLoggedInUser() == null) {
        console.log(
          "Please, log in or create new account to change your account settings"
        );
        new MainMenu().start();
        return;
      } else {
        console.log(i18n.t("settings.options"));
        const userInput = await this.prompt(i18n.t("enter.option"));

        if (userInput.toLowerCase() === MainMenu.MENU_COMMAND.toLowerCase()) {
          menuToNavigate = new MainMenu();
          break mainLoop;
        }

        const userOption = Number(userInput);
        switch (userOption) {
          case 1:
            menuToNavigate = new ChangePasswordMenu();
            break mainLoop;
          case 2:
            menuToNavigate = new ChangeEmailMenu();
            break mainLoop;
          default:
            console.log(i18n.t("settings.option.validation.msg"));
            continue;
        }
      }
    }

    menuToNavigate?.start();
  }

  printMenuHeader(): void {
    console.log(i18n.t("settings.menu.header"));
  }

  // Helper to prompt user input via console (Node.js environment)
  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readline.question(question + " ", (answer: string) => {
        readline.close();
        resolve(answer.trim());
      });
    });
  }
}

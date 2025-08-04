import { ApplicationContext } from "./configs/ApplicationContext";
import { Menu } from "./menu/Menu";
import * as readline from "readline";
import { MainMenu } from "./menu/impl/MainMenu"; // adjust path if necessary

const RESOURCE_BUNDLE = {
  "change.password.header": {
    en: "Change Password",
    ru: "Сменить пароль",
  },
  "enter.new.pass.cta": {
    en: "Enter new password: ",
    ru: "Введите новый пароль: ",
  },
  "change.password.msg": {
    en: "Password changed successfully!",
    ru: "Пароль успешно изменён!",
  },
};

type Language = "en" | "ru";

export class ChangePasswordMenu implements Menu {
  private context = ApplicationContext.getInstance();
  private currentLanguage: Language = "en";

  private getString(key: keyof typeof RESOURCE_BUNDLE): string {
    return RESOURCE_BUNDLE[key][this.currentLanguage] ?? key;
  }

  async start() {
    this.printMenuHeader();
    const userInput = await this.getUserInput();

    const loggedInUser = this.context.getLoggedInUser();
    if (loggedInUser) {
      loggedInUser.setPassword(userInput);
      console.log(this.getString("change.password.msg"));
    } else {
      console.log("No user is currently logged in.");
    }

    const mainMenu = new MainMenu();
    mainMenu.start();
  }

  printMenuHeader() {
    console.log(this.getString("change.password.header"));
    process.stdout.write(this.getString("enter.new.pass.cta"));
  }

  private getUserInput(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question("", (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }
}

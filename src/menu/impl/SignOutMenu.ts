import { ApplicationContext } from "src/configs/ApplicationContext";
import { Menu } from "src/menu/Menu";
import i18n from "i18next"; // Assuming you're using i18next

export class SignOutMenu implements Menu {
  private context: ApplicationContext;

  constructor() {
    this.context = ApplicationContext.getInstance();
  }

  start(): void {
    this.printMenuHeader();
    this.context.setLoggedInUser(null);
    const mainMenu = this.context.getMainMenu();

if (mainMenu) {
  mainMenu.start();
} else {
  console.log("Main menu is null or undefined.");
}

  }

  printMenuHeader(): void {
    console.log(i18n.t("sign.out.header"));
    console.log(i18n.t("bye.msg"));
  }
}

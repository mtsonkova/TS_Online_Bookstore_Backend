import { ApplicationContext } from "./configs/ApplicationContext";
import { User } from "./entities/entitiesInterfaces/User";
import { DefaultUser } from "./entities/impl/DefaultUser";
import { Menu } from "./menu/Menu";
import { UserManagementService } from "./services/UserManagementService";
import { DefaultUserManagementService } from "./services/impl/DefaultUserManagementService";
import * as readline from "readline";
import i18next from "./i18n/i18n";

export class SignUpMenu implements Menu {
  private userManagementService: UserManagementService;
  private context: ApplicationContext;

  constructor() {
    this.userManagementService = DefaultUserManagementService.getInstance();
    this.context = ApplicationContext.getInstance();
  }

  public async start(): Promise<void> {
    this.printMenuHeader();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const ask = (key: string): Promise<string> =>
      new Promise((resolve) => rl.question(i18next.t(key), resolve));

    const firstName = await ask("enter.your.first.name");
    const lastName = await ask("enter.your.last.name");
    const password = await ask("enter.your.pass");
    const email = await ask("enter.your.email");

    rl.close();

    this.userManagementService.getUsers(); // preload users

    const user: User = new DefaultUser(undefined, firstName, lastName, password, email);
    const errorMessage = this.userManagementService.registerUser(user);

    if (!errorMessage) {
      this.context.setLoggedInUser(user);
      console.log(i18next.t("user.created.msg"));
    } else {
      console.log(errorMessage);
    }

    const mainMenu = this.context.getMainMenu();

if (mainMenu != null) {
  mainMenu.start();
} else {
  console.log("The main menu object is null or undefined.");
}
  }

  public printMenuHeader(): void {
    console.log(i18next.t("sign.up.header"));
  }
}

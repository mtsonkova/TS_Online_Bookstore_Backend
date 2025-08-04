import { ApplicationContext } from "./configs/ApplicationContext";
import { User } from "./entities/entitiesInterfaces/User";
import { Menu } from "./menu/Menu";
import { UserManagementService } from "./services/UserManagementService";
import { DefaultUserManagementService } from "./services/impl/DefaultUserManagementService";
import i18n from "i18next";

export class SignInMenu implements Menu {
  private context: ApplicationContext;
  private userManagementService: UserManagementService;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.userManagementService = DefaultUserManagementService.getInstance();
  }

  async start(): Promise<void> {
    this.printMenuHeader();

    // For input, you might use prompt-sync or any other input method depending on your environment.
    // Here, I'll use a simple prompt function for demonstration (you might replace it with your own input logic)
    const userEmail = await this.prompt(i18n.t("please.enter.email"));
    const userPassword = await this.prompt(i18n.t("please.enter.pass"));

    const user: User | null = this.userManagementService.getUserByEmail(userEmail);

    if (user && user.getPassword() === userPassword) {
      console.log(
        i18n.t("glad.to.see.you.back", {
          firstName: user.getFirstName(),
          lastName: user.getLastName(),
        })
      );
      this.context.setLoggedInUser(user);
    } else {
      console.log(i18n.t("login.and.password.not.exist"));
    }

    const mainMenu = this.context.getMainMenu();
    if (mainMenu) {
      mainMenu.start();
    } else {
      console.log("Main menu is not available.");
    }
  }

  printMenuHeader(): void {
    console.log(i18n.t("sign.in.header"));
  }

  // Helper method to simulate input (replace with actual input logic)
  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      // For example, if running in Node.js, use 'readline' to get input from terminal
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

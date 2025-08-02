import { ApplicationContext } from "@src/configs/ApplicationContext";
import { Menu } from "@src/menu/Menu";
import { ResetPasswordService } from "@src/services/ResetPasswordService";
import { UserManagementService } from "@src/services/UserManagementService";
import { DefaultResetPasswordService } from "@src/services/impl/DefaultResetPasswordService";
import { DefaultUserManagementService } from "@src/services/impl/DefaultUserManagementService";
import { User } from "@src/entities/entitiesInterfaces/User";
import i18n from "i18next";
import { MainMenu } from "./MainMenu"; // adjust import path as needed

export class ResetPasswordMenu implements Menu {
  private resetPasswordService: ResetPasswordService;
  private userManagementService: UserManagementService;

  constructor() {
    this.resetPasswordService = new DefaultResetPasswordService();
    this.userManagementService = DefaultUserManagementService.getInstance();
  }

  async start(): Promise<void> {
    this.printMenuHeader();

    const userInput = await this.prompt("");

    console.log(i18n.t("pass.sent.to.email"));

    // Run reset password asynchronously (non-blocking)
    this.resetPasswordForUserAsync(userInput);

    // Navigate to main menu
    new MainMenu().start();
  }

  printMenuHeader(): void {
    console.log(i18n.t("reset.pass.header"));
    process.stdout.write(i18n.t("enter.your.email.msg") + " ");
  }

  private async resetPasswordForUserAsync(email: string): Promise<void> {
    try {
      const user: User | null = this.userManagementService.getUserByEmail(email);
      if (user) {
        await this.resetPasswordService.resetPasswordForUser(user);
      } else {
        console.log(i18n.t("user.not.found"));
      }
    } catch (error) {
      console.error(i18n.t("reset.password.error"), error);
    }
  }

  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readline.question(question, (answer: string) => {
        readline.close();
        resolve(answer.trim());
      });
    });
  }
}

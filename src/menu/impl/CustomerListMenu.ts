import { ApplicationContext } from "./configs/ApplicationContext";
import { User } from "./entities/entitiesInterfaces/User";
import { Menu } from "./menu/Menu";
import { UserManagementService } from "./services/UserManagementService";
import { DefaultUserManagementService } from "./services/impl/DefaultUserManagementService";
import i18n from "i18next";
import { MainMenu } from "./menu/impl/MainMenu"; // Adjust if needed

export class CustomerListMenu implements Menu {
  private context: ApplicationContext;
  private userManagementService: UserManagementService;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.userManagementService = DefaultUserManagementService.getInstance();
  }

  public start(): void {
    this.printMenuHeader();

    const users: User[] = this.userManagementService.getUsers();

    if (!users || users.length === 0) {
      console.log(i18n.t("no.users.msg")); // e.g. "No users found."
    } else {
      users.forEach((user: User) => {
        console.log(user); // Consider formatting user details here if needed
      });
    }

    this.context.getMainMenu()?.start();
  }

  public printMenuHeader(): void {
    console.log(i18n.t("customer.list.header")); // e.g. "Customer List"
  }
}

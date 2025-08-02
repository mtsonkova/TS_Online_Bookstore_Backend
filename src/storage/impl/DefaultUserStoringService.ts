import fs from "fs";
import path from "path";
import { User } from "@src/entities/entitiesInterfaces/User";
import { DefaultUser } from "@src/entities/impl/DefaultUser";
import { UserStoringService } from "@src/storage/UserStoringService";

export class DefaultUserStoringService implements UserStoringService {
  private static readonly USER_INFO_STORAGE = "users.csv";
  private static readonly CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
  private static readonly RESOURCES_FOLDER = "resources";
  private static readonly USER_EMAIL_INDEX = 4;
  private static readonly USER_PASSWORD_INDEX = 3;
  private static readonly USER_LASTNAME_INDEX = 2;
  private static readonly USER_FIRSTNAME_INDEX = 1;
  private static readonly USER_ID_INDEX = 0;

  private static instance: DefaultUserStoringService;

  private constructor() {} // prevent external instantiation

  public static getInstance(): DefaultUserStoringService {
    if (!DefaultUserStoringService.instance) {
      DefaultUserStoringService.instance = new DefaultUserStoringService();
    }
    return DefaultUserStoringService.instance;
  }

  public saveUser(user: User): void {
    const filePath = path.join(
      DefaultUserStoringService.RESOURCES_FOLDER,
      DefaultUserStoringService.CURRENT_TASK_RESOURCE_FOLDER,
      DefaultUserStoringService.USER_INFO_STORAGE
    );

    const data = `\n${this.convertToStorableString(user)}`;

    try {
      fs.appendFileSync(filePath, data, { encoding: "utf-8", flag: "a" });
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  }

  private convertToStorableString(user: User): string {
    return [
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getPassword(),
      user.getEmail()
    ].join(",");
  }

  public loadUsers(): User[] {
    const filePath = path.join(
      DefaultUserStoringService.RESOURCES_FOLDER,
      DefaultUserStoringService.CURRENT_TASK_RESOURCE_FOLDER,
      DefaultUserStoringService.USER_INFO_STORAGE
    );

    try {
      const data = fs.readFileSync(filePath, { encoding: "utf-8" });
      const lines = data.split("\n");

      return lines
        .filter(line => line.trim().length > 0)
        .map(line => {
          const userElements = line.split(",");
          return new DefaultUser(
            Number(userElements[DefaultUserStoringService.USER_ID_INDEX]),
            userElements[DefaultUserStoringService.USER_FIRSTNAME_INDEX],
            userElements[DefaultUserStoringService.USER_LASTNAME_INDEX],
            userElements[DefaultUserStoringService.USER_PASSWORD_INDEX],
            userElements[DefaultUserStoringService.USER_EMAIL_INDEX]
          );
        });
    } catch (err) {
      console.error("Failed to load users:", err);
      return [];
    }
  }
}

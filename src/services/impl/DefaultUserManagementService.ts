import { User } from '@src/entities/entitiesInterfaces/User';
import { DefaultUser } from '@src/entities/impl/DefaultUser';
import { UserManagementService } from '@src/services/UserManagementService';
import { DefaultUserStoringService } from '@src/storage/impl/DefaultUserStoringService';

export class DefaultUserManagementService implements UserManagementService {
  private static readonly NOT_UNIQUE_EMAIL_ERROR_MESSAGE =
    'This email is already used by another user. Please, use another email';
  private static readonly EMPTY_EMAIL_ERROR_MESSAGE =
    'You have to input email to register. Please, try one more time';
  private static readonly NO_ERROR_MESSAGE = '';

  private static instance: DefaultUserManagementService;
  private static defaultUserStoringService: DefaultUserStoringService = DefaultUserStoringService.getInstance();

  private constructor() {}

  public static getInstance(): UserManagementService {
    if (!DefaultUserManagementService.instance) {
      DefaultUserManagementService.instance = new DefaultUserManagementService();
    }
    return DefaultUserManagementService.instance;
  }

  public registerUser(user: User | null): string {
    if (user === null) {
      return DefaultUserManagementService.NO_ERROR_MESSAGE;
    }

    const errorMessage = this.checkUniqueEmail(user.getEmail());
    if (errorMessage) {
      return errorMessage;
    }

    DefaultUserManagementService.defaultUserStoringService.saveUser(user);
    return DefaultUserManagementService.NO_ERROR_MESSAGE;
  }

  private checkUniqueEmail(email: string | null): string {
    const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();

    if (!email || email.trim() === '') {
      return DefaultUserManagementService.EMPTY_EMAIL_ERROR_MESSAGE;
    }

    const emailExists = users.some(
      user =>
        user &&
        user.getEmail() &&
        user.getEmail().toLowerCase() === email.toLowerCase()
    );

    return emailExists
      ? DefaultUserManagementService.NOT_UNIQUE_EMAIL_ERROR_MESSAGE
      : DefaultUserManagementService.NO_ERROR_MESSAGE;
  }

  public getUsers(): User[] {
    const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();

    const validUserIds = users
      .filter(user => user && typeof user.getId() === 'number')
      .map(user => user.getId());

    const maxId = validUserIds.length > 0 ? Math.max(...validUserIds) : 0;
    DefaultUser.setCounter(maxId);

    return users;
  }

  public getUserByEmail(userEmail: string): User | null {
    const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();

    const foundUser = users.find(
      user =>
        user &&
        user.getEmail() &&
        user.getEmail().toLowerCase() === userEmail.toLowerCase()
    );

    return foundUser || null;
  }
}

import { User } from './entities/entitiesInterfaces/User';
import { ResetPasswordService } from './services/ResetPasswordService';
import { MailSender } from './utils/mail/MailSender';
import { DefaultMailSender } from './services/impl/DefaultMailSender'; // Make sure to import this

export class DefaultResetPasswordService implements ResetPasswordService {
  private mailSender: MailSender;

  constructor() {
    this.mailSender = DefaultMailSender.getInstance();
  }

  public resetPasswordForUser(user: User): void {
    const email = user.getEmail();
    const password = user.getPassword();
    this.mailSender.sendEmail(
      email,
      `Please, use this password to login: ${password}`
    );
  }
}

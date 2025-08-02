import { User } from '@src/entities/entitiesInterfaces/User';
import { ResetPasswordService } from '@src/services/ResetPasswordService';
import { MailSender } from '@src/utils/mail/MailSender';
import { DefaultMailSender } from '@src/services/impl/DefaultMailSender'; // Make sure to import this

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

import { MailSender } from "@src/utils/mail/MailSender";

export class DefaultMailSender implements MailSender {

	
	private static instance: DefaultMailSender;
	
	private constructor() {};
	
	
	public static getInstance(): DefaultMailSender {
		if (this.instance == null) {
			this.instance = new DefaultMailSender();
		}
		return this.instance;
	}
	
	public sendEmail(sendTo: string, messageToSend: string): void {
		// sending email here
	}

}

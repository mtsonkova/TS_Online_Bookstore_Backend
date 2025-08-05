export interface MailSender {
	
	sendEmail(sendTo: string, messageToSend:string): void;

}

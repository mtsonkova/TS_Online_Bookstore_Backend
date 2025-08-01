import { SupportTicket } from '@src/helpdesk/entities/SupportTicket';

export interface HelpDeskFacade {
	
	addNewSupportTicket(supportTicket: SupportTicket): void;
	
	getNextSupportTicket(): SupportTicket | undefined;

	/**
	 * @return amount of tickets that are not processed
	 */
	getNumberOfTickets(): number;
}

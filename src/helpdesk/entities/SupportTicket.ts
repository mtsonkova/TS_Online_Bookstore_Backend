import { Priority } from 'src/helpdesk/entities/Priority';
import { RequestType } from 'src/helpdesk/entities/RequestType';

export interface SupportTicket {

	getPriority(): Priority;

	/**
	 * This method returns the unique sequential number of the support ticket.
	 * This number can be used as an identifier. 
	 * Order is started from 1.
	 * The less the return number is - that support ticket was created earlier.
	 * 
	 * @return unique sequence number
	 */
	getSequentialNumber(): number;

	getRequestType(): RequestType;

}

import { SupportTicket } from "src/helpdesk/entities/SupportTicket";
import { HelpDeskFacade } from "src/helpdesk/facades/HelpDeskFacade";
import { CustomSupportTicketsComparator } from "src/helpdesk/utils/CustomerSupportTicketComparator";

export class DefaultHelpDeskFacade implements HelpDeskFacade {
  private tickets: SupportTicket[];

  private comparator: CustomSupportTicketsComparator;

  constructor() {
    this.tickets = [];
    this.comparator = new CustomSupportTicketsComparator();
  }

  public addNewSupportTicket(supportTicket: SupportTicket): void {
    this.tickets.push(supportTicket);
    this.tickets.sort(this.comparator.compare.bind(this.comparator));
  }

  public getNextSupportTicket(): SupportTicket | undefined {
    return this.tickets.shift();
  }

  public getNumberOfTickets(): number {
    return this.tickets.length;
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHelpDeskFacade = void 0;
const CustomerSupportTicketComparator_1 = require("src/helpdesk/utils/CustomerSupportTicketComparator");
class DefaultHelpDeskFacade {
    constructor() {
        this.tickets = [];
        this.comparator = new CustomerSupportTicketComparator_1.CustomSupportTicketsComparator();
    }
    addNewSupportTicket(supportTicket) {
        this.tickets.push(supportTicket);
        this.tickets.sort(this.comparator.compare.bind(this.comparator));
    }
    getNextSupportTicket() {
        return this.tickets.shift();
    }
    getNumberOfTickets() {
        return this.tickets.length;
    }
}
exports.DefaultHelpDeskFacade = DefaultHelpDeskFacade;

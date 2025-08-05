"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSupportTicketsComparator = void 0;
class CustomSupportTicketsComparator {
    compare(ticket1, ticket2) {
        // Handle null tickets or null priorities gracefully
        if (ticket1 === null ||
            ticket2 === null ||
            ticket1.getPriority() == null ||
            ticket2.getPriority() == null) {
            return 0;
        }
        // Compare priority descending (assuming priority is an enum or number)
        const priorityDiff = ticket2.getPriority() - ticket1.getPriority();
        if (priorityDiff !== 0) {
            return priorityDiff;
        }
        // If priorities equal, compare sequentialNumber ascending
        return ticket1.getSequentialNumber() - ticket2.getSequentialNumber();
    }
}
exports.CustomSupportTicketsComparator = CustomSupportTicketsComparator;

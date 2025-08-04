"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSupportTicket = void 0;
const RequestType_1 = require("src/helpdesk/entities/RequestType");
class DefaultSupportTicket {
    constructor(requestType) {
        this.requestType = requestType;
        this.sequentialNumber = ++DefaultSupportTicket.counter;
    }
    getPriority() {
        return RequestType_1.RequestTypePriority[this.requestType];
    }
    getSequentialNumber() {
        return this.sequentialNumber;
    }
    getRequestType() {
        return this.requestType;
    }
}
exports.DefaultSupportTicket = DefaultSupportTicket;
DefaultSupportTicket.counter = 0;

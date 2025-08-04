"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMailSender = void 0;
class DefaultMailSender {
    constructor() { }
    ;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new DefaultMailSender();
        }
        return this.instance;
    }
    sendEmail(sendTo, messageToSend) {
        // sending email here
    }
}
exports.DefaultMailSender = DefaultMailSender;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResetPasswordService = void 0;
const DefaultMailSender_1 = require("src/services/impl/DefaultMailSender"); // Make sure to import this
class DefaultResetPasswordService {
    constructor() {
        this.mailSender = DefaultMailSender_1.DefaultMailSender.getInstance();
    }
    resetPasswordForUser(user) {
        const email = user.getEmail();
        const password = user.getPassword();
        this.mailSender.sendEmail(email, `Please, use this password to login: ${password}`);
    }
}
exports.DefaultResetPasswordService = DefaultResetPasswordService;

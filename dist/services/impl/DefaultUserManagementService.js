"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUserManagementService = void 0;
const DefaultUser_1 = require("./entities/impl/DefaultUser");
const DefaultUserStoringService_1 = require("./storage/impl/DefaultUserStoringService");
class DefaultUserManagementService {
    constructor() { }
    static getInstance() {
        if (!DefaultUserManagementService.instance) {
            DefaultUserManagementService.instance = new DefaultUserManagementService();
        }
        return DefaultUserManagementService.instance;
    }
    registerUser(user) {
        if (user === null) {
            return DefaultUserManagementService.NO_ERROR_MESSAGE;
        }
        const errorMessage = this.checkUniqueEmail(user.getEmail());
        if (errorMessage) {
            return errorMessage;
        }
        DefaultUserManagementService.defaultUserStoringService.saveUser(user);
        return DefaultUserManagementService.NO_ERROR_MESSAGE;
    }
    checkUniqueEmail(email) {
        const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();
        if (!email || email.trim() === '') {
            return DefaultUserManagementService.EMPTY_EMAIL_ERROR_MESSAGE;
        }
        const emailExists = users.some(user => user &&
            user.getEmail() &&
            user.getEmail().toLowerCase() === email.toLowerCase());
        return emailExists
            ? DefaultUserManagementService.NOT_UNIQUE_EMAIL_ERROR_MESSAGE
            : DefaultUserManagementService.NO_ERROR_MESSAGE;
    }
    getUsers() {
        const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();
        const validUserIds = users
            .filter(user => user && typeof user.getId() === 'number')
            .map(user => user.getId());
        const maxId = validUserIds.length > 0 ? Math.max(...validUserIds) : 0;
        DefaultUser_1.DefaultUser.setCounter(maxId);
        return users;
    }
    getUserByEmail(userEmail) {
        const users = DefaultUserManagementService.defaultUserStoringService.loadUsers();
        const foundUser = users.find(user => user &&
            user.getEmail() &&
            user.getEmail().toLowerCase() === userEmail.toLowerCase());
        return foundUser || null;
    }
}
exports.DefaultUserManagementService = DefaultUserManagementService;
DefaultUserManagementService.NOT_UNIQUE_EMAIL_ERROR_MESSAGE = 'This email is already used by another user. Please, use another email';
DefaultUserManagementService.EMPTY_EMAIL_ERROR_MESSAGE = 'You have to input email to register. Please, try one more time';
DefaultUserManagementService.NO_ERROR_MESSAGE = '';
DefaultUserManagementService.defaultUserStoringService = DefaultUserStoringService_1.DefaultUserStoringService.getInstance();

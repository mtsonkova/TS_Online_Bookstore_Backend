"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUserStoringService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DefaultUser_1 = require("@src/entities/impl/DefaultUser");
class DefaultUserStoringService {
    constructor() { } // prevent external instantiation
    static getInstance() {
        if (!DefaultUserStoringService.instance) {
            DefaultUserStoringService.instance = new DefaultUserStoringService();
        }
        return DefaultUserStoringService.instance;
    }
    saveUser(user) {
        const filePath = path_1.default.join(DefaultUserStoringService.RESOURCES_FOLDER, DefaultUserStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultUserStoringService.USER_INFO_STORAGE);
        const data = `\n${this.convertToStorableString(user)}`;
        try {
            fs_1.default.appendFileSync(filePath, data, { encoding: "utf-8", flag: "a" });
        }
        catch (err) {
            console.error("Failed to save user:", err);
        }
    }
    convertToStorableString(user) {
        return [
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getPassword(),
            user.getEmail()
        ].join(",");
    }
    loadUsers() {
        const filePath = path_1.default.join(DefaultUserStoringService.RESOURCES_FOLDER, DefaultUserStoringService.CURRENT_TASK_RESOURCE_FOLDER, DefaultUserStoringService.USER_INFO_STORAGE);
        try {
            const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
            const lines = data.split("\n");
            return lines
                .filter(line => line.trim().length > 0)
                .map(line => {
                const userElements = line.split(",");
                return new DefaultUser_1.DefaultUser(Number(userElements[DefaultUserStoringService.USER_ID_INDEX]), userElements[DefaultUserStoringService.USER_FIRSTNAME_INDEX], userElements[DefaultUserStoringService.USER_LASTNAME_INDEX], userElements[DefaultUserStoringService.USER_PASSWORD_INDEX], userElements[DefaultUserStoringService.USER_EMAIL_INDEX]);
            });
        }
        catch (err) {
            console.error("Failed to load users:", err);
            return [];
        }
    }
}
exports.DefaultUserStoringService = DefaultUserStoringService;
DefaultUserStoringService.USER_INFO_STORAGE = "users.csv";
DefaultUserStoringService.CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
DefaultUserStoringService.RESOURCES_FOLDER = "resources";
DefaultUserStoringService.USER_EMAIL_INDEX = 4;
DefaultUserStoringService.USER_PASSWORD_INDEX = 3;
DefaultUserStoringService.USER_LASTNAME_INDEX = 2;
DefaultUserStoringService.USER_FIRSTNAME_INDEX = 1;
DefaultUserStoringService.USER_ID_INDEX = 0;

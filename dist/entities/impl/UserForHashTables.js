"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForHashTables = void 0;
const object_hash_1 = __importDefault(require("object-hash"));
class UserForHashTables {
    constructor(id, firstName, lastName, password, email) {
        this.id = id ?? ++UserForHashTables.userCounter;
        UserForHashTables.userCounter--; // to keep sequantial id
        this.firstName = firstName ?? '';
        this.lastName = lastName ?? '';
        this.password = password ?? '';
        this.email = email ?? '';
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    toString() {
        return "ID: " + this.getId() + "\t\t" +
            "First Name: " + this.getFirstName() + "\t\t" +
            "Last Name: " + this.getLastName() + "\t\t" +
            "Email: " + this.getEmail();
    }
    setPassword(password) {
        if (password == null) {
            return;
        }
        this.password = password;
    }
    setEmail(newEmail) {
        if (newEmail == null) {
            return;
        }
        this.email = newEmail;
    }
    getId() {
        return this.id;
    }
    clearState() {
        UserForHashTables.userCounter = 0;
    }
    // public hashCode(): number {
    // 	return Objects.hash(this.email, this.firstName, this.id, this.lastName, this.password);
    // }
    hashCode() {
        return (0, object_hash_1.default)({
            email: this.email,
            firstName: this.firstName,
            id: this.id,
            lastName: this.lastName,
            password: this.password
        });
    }
    equals(obj) {
        if (this === obj)
            return true;
        if (!obj || !(obj instanceof UserForHashTables))
            return false;
        return this.email === obj.email &&
            this.firstName === obj.firstName &&
            this.id === obj.id &&
            this.lastName === obj.lastName &&
            this.password === obj.password;
    }
}
exports.UserForHashTables = UserForHashTables;
UserForHashTables.userCounter = 0;

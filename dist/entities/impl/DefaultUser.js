"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUser = void 0;
const validate_1 = require("./annotations/validate");
class DefaultUser {
    constructor(id, firstName, lastName, password, email) {
        this.id = id ?? ++DefaultUser.userCounter;
        DefaultUser.userCounter--; // to keep sequantial id
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
        DefaultUser.userCounter = 0;
    }
    static setCounter(updatedCount) {
        DefaultUser.userCounter = updatedCount;
    }
}
exports.DefaultUser = DefaultUser;
DefaultUser.userCounter = 0;
__decorate([
    (0, validate_1.validate)('[a-zA-Z]+')
], DefaultUser.prototype, "firstName", void 0);
__decorate([
    (0, validate_1.validate)('[a-zA-Z]+')
], DefaultUser.prototype, "lastName", void 0);
__decorate([
    (0, validate_1.validate)('.+@.+')
], DefaultUser.prototype, "email", void 0);

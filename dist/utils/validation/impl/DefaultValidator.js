"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValidator = void 0;
// src/utils/validation/DefaultValidator.ts
require("reflect-metadata");
class DefaultValidator {
    isValid(obj) {
        const keys = Object.getOwnPropertyNames(obj);
        for (const key of keys) {
            const pattern = Reflect.getMetadata("validate:pattern", obj, key);
            if (pattern) {
                const value = obj[key];
                if (typeof value === "string" && !value.match(new RegExp(pattern))) {
                    console.log("FALSE", value);
                    return false;
                }
            }
        }
        return true;
    }
}
exports.DefaultValidator = DefaultValidator;

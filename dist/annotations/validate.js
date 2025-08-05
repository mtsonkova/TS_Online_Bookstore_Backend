"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(pattern) {
    return function (target, propertyKey) {
        if (!target.constructor.__validations) {
            target.constructor.__validations = [];
        }
        target.constructor.__validations.push({
            property: propertyKey,
            pattern: new RegExp(pattern)
        });
    };
}

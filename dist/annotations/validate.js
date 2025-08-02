"use strict";
// To Do
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
// package com.itbulls.learnit.javacore.exam.solution.annotations;
// import java.lang.annotation.ElementType;
// import java.lang.annotation.Retention;
// import java.lang.annotation.RetentionPolicy;
// import java.lang.annotation.Target;
// @Target(ElementType.FIELD)
// @Retention(RetentionPolicy.RUNTIME)
// public @interface Validate {
// 	String pattern();
// }
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

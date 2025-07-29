// To Do

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

export function validate(pattern: string) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.__validations) {
      target.constructor.__validations = [];
    }

    target.constructor.__validations.push({
      property: propertyKey,
      pattern: new RegExp(pattern)
    });
  };
}

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

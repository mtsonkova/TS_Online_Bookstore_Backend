// ./utils/validation/DefaultValidator.ts
import "reflect-metadata";
import { Validator } from './utils/validation/Validator'

export class DefaultValidator implements Validator {
  isValid(obj: object): boolean {
    const keys = Object.getOwnPropertyNames(obj);

    for (const key of keys) {
      const pattern: string | undefined = Reflect.getMetadata("validate:pattern", obj, key);
      if (pattern) {
        const value = (obj as any)[key];
        if (typeof value === "string" && !value.match(new RegExp(pattern))) {
          console.log("FALSE", value);
          return false;
        }
      }
    }

    return true;
  }
}

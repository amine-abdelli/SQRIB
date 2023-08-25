import { HttpError } from './error.utils';

/**
 * Validates if the given object only contains allowed keys for the Settings interface.
 * (e.g. of allowed keys : 'theme', 'sound', 'language', 'font_size', 'keyboard_layout'.)
 *
 * @param obj - The input object to be validated.
 * @param allowedKeys - The allowed keys for the input object.
 * @returns True if the input object contains only allowed keys, otherwise False.
 */
export function validateObjectKeys(obj: object, allowedKeys: string[]) {
  const objKeys = Object.keys(obj);
  // Check if every key in objKeys is allowed
  const isValid = objKeys.every((key) => allowedKeys.includes(key));
  if (!isValid) throw new HttpError(400, `Invalid keys: ${objKeys.filter((key) => !allowedKeys.includes(key))}`);
}

export function checkRequiredFields<T>(body: Partial<T>, requiredKeys: string[]): string[] {
  const missingFields: string[] = [];
  for (const key of requiredKeys) {
    if (!(key in body)) {
      missingFields.push(key as string);
    }
  }

  return missingFields;
}

/**
 * Validates if the given object only contains allowed keys for the Settings interface.
 * (e.g. of allowed keys : 'theme', 'sound', 'language', 'font_size', 'keyboard_layout'.)
 *
 * @param obj - The input object to be validated.
 * @param allowedKeys - The allowed keys for the input object.
 * @returns True if the input object contains only allowed keys, otherwise False.
 */
export function validateObjectKeys<T>(obj: object, allowedKeys: string[]): obj is Partial<T> {
  const objKeys = Object.keys(obj);
  // Check if every key in objKeys is allowed
  return objKeys.every((key) => allowedKeys.includes(key));
}

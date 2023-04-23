/**
 * Creates a concatenated string from the root and sublink parameters.
 *
 * @param {string} root - The root string, typically the base URL or path.
 * @param {string} sublink - The sublink or subpath to append to the root.
 * @returns {string} The concatenated string containing the root and sublink.
 */
export function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

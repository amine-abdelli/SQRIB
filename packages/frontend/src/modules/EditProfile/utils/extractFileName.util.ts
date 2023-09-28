/**
 * Extracts the filename from a given URL. 
 * Decodes the URL and removes query parameters.
 *
 * @param {string} url - The URL from which to extract the filename.
 * @returns {string | null} The extracted filename, or null if it cannot be determined.
 */
export function extractFilename(url: string): string | null {
  // Decodes URL to replace %2F with '/'
  const decodedUrl = decodeURIComponent(url);

  // Split the URL by '/' and take the last part
  const parts = decodedUrl.split('/');
  const lastPart = parts[parts.length - 1];

  // Split by '?' to remove any query parameters, then take the first part
  const filename = lastPart.split('?')[0];

  return filename || null; // If filename is an empty string, return null
}

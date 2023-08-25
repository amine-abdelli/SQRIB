/**
 * Calculate the duration in seconds between two timestamps.
 *
 * @param {number} start_time - The start timestamp.
 * @param {number} end_time - The end timestamp.
 * @returns {number} The duration in seconds.
 */
export function calculateDuration(start_time: number, end_time: number) {
  return Math.floor((end_time - start_time) / 1000);
}

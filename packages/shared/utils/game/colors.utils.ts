/**
 * Generate a random color
 * @returns {string} An hex color
 */
export function generateRandomColor() {
  // Avoid colors too dark (less than 60 in decimal or 3C in hexadecimal)
  // and too light (greater than 235 in decimal or EB in hexadecimal)
  const getRandomChannel = () => Math.floor(Math.random() * (235 - 60 + 1) + 60).toString(16).padStart(2, '0');

  const red = getRandomChannel();
  const green = getRandomChannel();
  const blue = getRandomChannel();

  return `#${red}${green}${blue}`;
}

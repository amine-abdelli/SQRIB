/**
 * Generate a random color
 * @returns {string} An hex color
 */
function colorGenerator() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

export { colorGenerator };

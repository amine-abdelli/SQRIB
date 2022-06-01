/**
 * Format a number to a string suffixed with the right order
 * @param index player's position
 * @returns a well formated order string (e.g. 1st, 2nd, 3rd, 4th, 5th, ...)
 */
function suffixPosition(index: number) {
  switch (index) {
    case 1:
      return `${index}st`;
    case 2:
      return `${index}nd`;
    case 3:
      return `${index}rd`;
    default:
      return `${index}th`;
  }
}

export { suffixPosition };

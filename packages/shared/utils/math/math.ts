/**
 * Round a number to a defined precision.
 * @param number Number to round
 * @param precision Precision to round to
 * @returns A rounded number
 */
function roundNumber(number: number, decimal: number): number {
  return Math.round(number * 10 ** decimal) / 10 ** decimal;
}

function roundToDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Returns a random number in a defined range.
 * @param range Area of variations between 0 and a defined +limit
 * @returns A random number between -range and +range
 */
function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
}

/**
 * Returns a random number between a -min and a +max.
 * @param min -minimum range
 * @param max -maximal range
 * @returns a number between -min and +max
 */
function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export {
  roundNumber, getRandomWordIndex, randomIntFromInterval, roundToDecimal,
};

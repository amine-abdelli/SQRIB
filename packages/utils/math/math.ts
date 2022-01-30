function roundNumber(number: number, decimal: number): number {
  return Math.round(number * 10 ** decimal) / 10 ** decimal;
}

/* Return random index */
function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
}

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { roundNumber, getRandomWordIndex, randomIntFromInterval };

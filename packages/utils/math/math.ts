function roundNumber(number: number, decimal: number): number {
  return Math.round(number * 10 ** decimal) / 10 ** decimal;
}

/* Return random index */
function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
}

export { roundNumber, getRandomWordIndex };

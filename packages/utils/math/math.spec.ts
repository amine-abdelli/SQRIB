import { roundNumber, getRandomWordIndex, randomIntFromInterval } from './math';

describe('Test math utils', () => {
  it('Should round a number', () => {
    expect(roundNumber(1.288, 2)).toBe(1.29);
    expect(roundNumber(1.288, 1)).toBe(1.3);
    expect(roundNumber(1.228, 0)).toBe(1);
  });

  it('Should create a random number between 0 and a defined range limit', () => {
    expect(getRandomWordIndex(10)).toBeGreaterThanOrEqual(0);
    expect(getRandomWordIndex(10)).toBeLessThanOrEqual(10);
  });

  it('Should generate a random number between a -min and a +max', () => {
    expect(randomIntFromInterval(-10, 10)).toBeGreaterThanOrEqual(-10);
    expect(randomIntFromInterval(-10, 10)).toBeLessThanOrEqual(10);
    expect(randomIntFromInterval(-123123, 123123)).toBeGreaterThanOrEqual(-123123);
    expect(randomIntFromInterval(-123123, 123123)).toBeLessThanOrEqual(123123);
  });
});

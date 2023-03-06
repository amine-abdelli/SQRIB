import { averageValue, topValue } from './array';
import { scoringMock } from './array.mock';

describe('Calculate scoring average and top values', () => {
  it('Should return the average array value based on the given object key', () => {
    expect(averageValue(scoringMock, 'mpm')).toBe(64.56);
    expect(averageValue(scoringMock, 'points')).toBe(304.5);
    expect(averageValue(scoringMock, 'precision')).toBe(93.94);
    expect(averageValue(['a', 'b', 'c'], 'mpm')).toBe(NaN);
  });

  it('Should return the highest array value based on the given object key', () => {
    expect(topValue(scoringMock, 'mpm')).toBe(95);
    expect(topValue(scoringMock, 'points')).toBe(461);
    expect(topValue(scoringMock, 'precision')).toBe(99);
    expect(topValue(['a', 'b', 'c'], 'mpm')).toBe(NaN);
  });
});

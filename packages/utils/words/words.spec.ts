import { generateWordSet } from './generateWordSet.utils';

describe('Word set generation', () => {
  it('Should return a word set with the defined length and language', () => {
    const englishSet = generateWordSet('en', 300);
    expect(englishSet).toHaveLength(300);
    for (const aWord of englishSet) {
      expect(aWord).toBeTruthy();
      expect(typeof aWord).toBe('string');
    }

    const spanishSet = generateWordSet('en', 300);
    expect(spanishSet).toHaveLength(300);
    for (const aWord of spanishSet) {
      expect(aWord).toBeTruthy();
      expect(typeof aWord).toBe('string');
    }

    const germanSet = generateWordSet('en', 300);
    expect(germanSet).toHaveLength(300);
    for (const aWord of germanSet) {
      expect(aWord).toBeTruthy();
      expect(typeof aWord).toBe('string');
    }

    const frenchSet = generateWordSet('en', 300);
    expect(frenchSet).toHaveLength(300);
    for (const aWord of frenchSet) {
      expect(aWord).toBeTruthy();
      expect(typeof aWord).toBe('string');
    }
  });
});

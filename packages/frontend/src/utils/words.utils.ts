/**
 * Counts the total, correct and incorrect letters from a set of typed words
 *
 * @param {string[]} wordChain - An array of words.
 * @param {string[]} typedWords - An array of words typed by the user.
 * @returns An object with three properties:
 *    - correctLetters: The total number of letters that the user typed correctly.
 *    - wrongLetters: The total number of letters that the user typed incorrectly.
 *    - totalLetters: The total number of letters that the user typed.
 */
export function countLetters(wordChain: string[], typedWords: string[]) {
  const totalLettersOfReference = wordChain.slice(0, typedWords.length).reduce((a, v) => a + v.length, 0);
  let count = 0;
  const wrongLettersList = [];
  //
  for (let i = 0; i < wordChain?.length; i += 1) {
    for (let j = 0; j < typedWords[i]?.length; j += 1) {
      if (wordChain[i][j] === typedWords[i][j]) {
        count += 1;
      } else {
        wrongLettersList.push(wordChain[i][j])
      }
    }
  }
  return { correctLetters: count, wrongLetters: wrongLettersList.length, totalLetters: totalLettersOfReference };
}

export function countCorrectlyTypedWords(typedWords: string[], wordChain: string[]) {
  let correctlyTypedWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    const element = typedWords[i];
    if (element === wordChain[i]) {
      correctlyTypedWords += 1;
    }
  }
  return correctlyTypedWords
}

export function countOccurrences(arr: string[]) {
  return arr.reduce((acc: any, letter: string) => {
    if (acc[letter]) {
      acc[letter]++;
    } else {
      acc[letter] = 1;
    }
    return acc;
  }, {});
}

export function pickRandomItem(items: any[] = []): string {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
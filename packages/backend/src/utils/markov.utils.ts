/* eslint-disable max-len */
// class MarkovChain {
//   private chain: { [key: string]: string[] };

//   constructor(letters: string[]) {
//     this.chain = {};

//     for (let i = 0; i < letters.length - 1; i += 1) {
//       if (!this.chain[letters[i]]) {
//         this.chain[letters[i]] = [];
//       }
//       this.chain[letters[i]].push(letters[i + 1]);
//     }
//   }

//   generateWord(minLength: number, maxLength: number): string {
//     const wordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
//     let word = '';
//     let currentLetter = this.getRandomLetter();

//     for (let i = 0; i < wordLength; i += 1) {
//       word += currentLetter;
//       currentLetter = this.getNextLetter(currentLetter);
//     }

//     return word;
//   }

//   private getRandomLetter(): string {
//     const letters = Object.keys(this.chain);
//     return letters[Math.floor(Math.random() * letters.length)];
//   }

//   private getNextLetter(currentLetter: string): string {
//     const nextLetters = this.chain[currentLetter] || [];
//     if (nextLetters.length === 0) {
//       return this.getRandomLetter();
//     }
//     return nextLetters[Math.floor(Math.random() * nextLetters.length)];
//   }
// }

// function generateRandomWords(
//   count: number,
//   minLength: number,
//   maxLength: number,
//   letters: string[],
// ): string[] {
//   const markovChain = new MarkovChain(letters);
//   const words: string[] = [];
//   for (let i = 0; i < count; i += 1) {
//     words.push(markovChain.generateWord(minLength, maxLength));
//   }
//   return words;
// }

// function getMatchingWords(letters: string[], wordList: string[]): string[] {
//   return wordList.filter((word) => {
//     const wordLetters = word.split('');
//     return wordLetters.every((letter) => letters.includes(letter));
//   });
// }

// function insertWordsAtRandomPositions(prioritizedWords: string[], randomWords: string[]): string[] {
//   const result: string[] = [...randomWords];

//   prioritizedWords.forEach((word) => {
//     const randomIndex = Math.floor(Math.random() * (result.length + 1));
//     result.splice(randomIndex, 0, word);
//   });

//   return result;
// }

// export function generateRandomWordsWithPriority(
//   count: number,
//   minLength: number,
//   maxLength: number,
//   letters: string[],
//   wordList: string[],
// ): string[] {
//   const matchingWords = getMatchingWords(letters, wordList);
//   const numberOfRandomWords = count - matchingWords.length;
//   const randomWords = generateRandomWords(numberOfRandomWords, minLength, maxLength, letters);

//   return insertWordsAtRandomPositions(matchingWords, randomWords);
// }

// ########################################
// ########################################
// ########################################

class MarkovChain {
  private chain: { [key: string]: string[] };

  constructor(letters: string[]) {
    this.chain = {};

    for (let i = 0; i < letters.length - 1; i += 1) {
      if (!this.chain[letters[i]]) {
        this.chain[letters[i]] = [];
      }
      this.chain[letters[i]].push(letters[i + 1]);
    }
  }

  generateWord(minLength: number, maxLength: number, requiredLetter: string): string {
    let word = '';

    do {
      word = '';
      const wordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      let currentLetter = this.getRandomLetter();

      for (let i = 0; i < wordLength; i += 1) {
        word += currentLetter;
        currentLetter = this.getNextLetter(currentLetter);
      }
    } while (!word.includes(requiredLetter));
    return word;
  }

  private getRandomLetter(): string {
    const letters = Object.keys(this.chain);
    return letters[Math.floor(Math.random() * letters.length)];
  }

  private getNextLetter(currentLetter: string): string {
    const nextLetters = this.chain[currentLetter] || [];
    if (nextLetters.length === 0) {
      return this.getRandomLetter();
    }
    return nextLetters[Math.floor(Math.random() * nextLetters.length)];
  }
}

function generateRandomWords(
  count: number,
  minLength: number,
  maxLength: number,
  letters: string[],
): string[] {
  const markovChain = new MarkovChain(letters);
  const words: string[] = [];
  const requiredLetter = letters[letters.length - 1];
  for (let i = 0; i < count; i += 1) {
    words.push(markovChain.generateWord(minLength, maxLength, requiredLetter));
  }
  return words;
}

function getMatchingWords(letters: string[], wordList: string[], targetedLetter: string): string[] {
  return wordList.filter((word) => {
    const wordLetters = word.split('');
    return wordLetters.every((letter) => letters.includes(letter)) && word.includes(targetedLetter);
  });
}

function insertWordsAtRandomPositions(prioritizedWords: string[], randomWords: string[]): string[] {
  const result: string[] = [...randomWords];

  prioritizedWords.forEach((word) => {
    const randomIndex = Math.floor(Math.random() * (result.length + 1));
    result.splice(randomIndex, 0, word);
  });

  return result;
}

export function generateRandomWordsWithPriority(
  count: number,
  minLength: number,
  maxLength: number,
  letters: string[],
  wordList: string[],
): string[] {
  const matchingWords = getMatchingWords(letters, wordList, letters[letters.length - 1]);
  if (matchingWords.length >= count) {
    return matchingWords.slice(0, count);
  }
  const randomWords = generateRandomWords(
    count - matchingWords.length,
    minLength,
    maxLength,
    letters,
  );
  return insertWordsAtRandomPositions(matchingWords, randomWords);
}

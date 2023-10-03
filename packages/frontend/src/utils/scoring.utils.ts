import { countLetters } from "./words.utils";

function calculateWPM(
  originalWords: string[],
  userTypedWords: string[],
  startTime: number,
  endTime: number,
): number {
  const elapsedTimeInMinutes = (endTime - startTime) / 1000 / 60; // Convert time to minutes
  const { correctLetters } = countLetters(originalWords, userTypedWords)

  // ! FOR HARD MODE (ZEN MODE DEACTIVATED)
  let correctLettersCount = 0;
  // Iterate through userTypedWords and compare to originalWords
  for (let i = 0; i < userTypedWords.length; i += 1) {
    if (originalWords[i] === userTypedWords[i]) {
      correctLettersCount += userTypedWords[i].length;
    }
  }
  // ! END -- FOR HARD MODE (ZEN MODE DEACTIVATED)
  // The number of time the user pressed the space bar
  const spaceBarPressCount = userTypedWords.length - 1;
  // Calculate WPM (considering that 1 WPM is 5 letters typed correctly)
  const wpm = (correctLetters + spaceBarPressCount) / 5 / elapsedTimeInMinutes;
  return Math.max(round(wpm), 0) || 0;
}

const round = (num: number, n: number = 0): number => +num.toFixed(n);

// Calculation based on this document : https://www.doc-developpement-durable.org/file/Projets-informatiques/cours-&-manuels-informatiques/cours-dactylographie-secretariat/Theorie+sur+la+vitesse+dactylographique.pdf#=_=
// Give partial credit for words that are partially correct
const calculateZenModeAccuracy = (wordsOfReference: string[], typedWords: string[], misspellings: string[]): number => {
  const totalLettersOfReference = wordsOfReference.slice(0, typedWords.length).reduce((a, v) => a + v.length, 0);
  if (totalLettersOfReference === 0) return 0;
  const typosCount = misspellings?.length || 0;
  return Math.max(100 - round((typosCount * 100) / totalLettersOfReference), 0)
};

// Let's consider adding some bonus point. For example, if the user typed all the words correctly, we can add 10 points to the final score.
// If he didn't use the zen mode add extra points etc ...
// https://www.notion.so/Bonus-points-40fcd63aeba543ecba8b8a6cdb2216ff
function calculatePoints(
  originalWords: string[],
  userTypedWords: string[],
  startTime: number,
  endTime: number,
  misspellings: string[],
): number {
  // Calculate WPM
  const wpm = calculateWPM(originalWords, userTypedWords, startTime, endTime);
  const { correctLetters } = countLetters(originalWords, userTypedWords)

  // Calculate Accuracy
  const accuracy = calculateZenModeAccuracy(originalWords, userTypedWords, misspellings);

  // ! FOR HARD MODE (ZEN MODE DEACTIVATED)
  // Calculate Correct Words
  let correctWordsCount = 0;
  for (let i = 0; i < userTypedWords.length; i += 1) {
    if (originalWords[i] === userTypedWords[i]) {
      correctWordsCount += 1;
    }
  }
  // correctWordsCount would replace  correctLetters
  // ! FOR HARD MODE (ZEN MODE DEACTIVATED)

  // Weights for each factor (you can adjust these as per your preference)
  const wpmWeight = 1;
  const accuracyWeight = 1;
  const correctWordsWeight = 1;
  // Calculate total points
  const points = wpm * wpmWeight
    + accuracy * accuracyWeight
    + correctLetters * correctWordsWeight;
  return round(points) || 0;
}

function convertSecondsToTimerFormat(timer: number): string {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export function orderSuffix(rank: number) {
  let suffix = 'th';
  if (rank === 1 || rank === 21 || rank === 31) {
    suffix = 'st';
  } else if (rank === 2 || rank === 22) {
    suffix = 'nd';
  } else if (rank === 3 || rank === 23) {
    suffix = 'rd';
  }
  return suffix
}

export {
  calculateWPM, calculateZenModeAccuracy, calculatePoints, convertSecondsToTimerFormat,
};
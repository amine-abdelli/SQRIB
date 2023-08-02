// TODO Take into account ONLY correctly typed words
function calculateWPM(
  originalWords: string[],
  userTypedWords: string[],
  startTime: number,
  endTime: number,
): number {
  const elapsedTimeInMinutes = (endTime - startTime) / 1000 / 60; // Convert time to minutes
  let correctLettersCount = 0;

  // Iterate through userTypedWords and compare to originalWords
  for (let i = 0; i < userTypedWords.length; i += 1) {
    if (originalWords[i] === userTypedWords[i]) {
      correctLettersCount += userTypedWords[i].length;
    }
  }
  // The number of time the user pressed the space bar
  const spaceBarPressCount = userTypedWords.length;

  // Calculate WPM (considering that 1 WPM is 5 letters typed correctly)
  const wpm = (correctLettersCount + spaceBarPressCount) / 5 / elapsedTimeInMinutes;
  return round(wpm) || 0;
}

const round = (num: number, n: number = 0): number => +num.toFixed(n);

const countCorrectLetters = (ref: string = '', typed: string = ''): number =>
  [...typed].filter((v, i) => v === ref[i]).length;

const calculateAccuracy = (typedWords: string[], wordsOfReference: string[]): number => {
  const totalCharacters = wordsOfReference.reduce((a, v) => a + v.length, 0);
  const correctLettersCount = typedWords.reduce((a, v, i) => a + countCorrectLetters(wordsOfReference[i], v), 0);
  return round((correctLettersCount / totalCharacters) * 100, 2) ?? 0;
};

function calculatePoints(
  originalWords: string[],
  userTypedWords: string[],
  startTime: number,
  endTime: number,
): number {
  // Calculate WPM
  const wpm = calculateWPM(originalWords, userTypedWords, startTime, endTime);

  // Calculate Accuracy
  const accuracy = calculateAccuracy(originalWords, userTypedWords);

  // Calculate Correct Words
  let correctWordsCount = 0;
  for (let i = 0; i < userTypedWords.length; i += 1) {
    if (originalWords[i] === userTypedWords[i]) {
      correctWordsCount += 1;
    }
  }

  // Weights for each factor (you can adjust these as per your preference)
  const wpmWeight = 1;
  const accuracyWeight = 1;
  const correctWordsWeight = 1;

  // Calculate total points
  const points = wpm * wpmWeight
    + accuracy * accuracyWeight
    + correctWordsCount * correctWordsWeight;

  return round(points) || 0;
}

function convertSecondsToTimerFormat(timer: number): string {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export {
  calculateWPM, calculateAccuracy, calculatePoints, convertSecondsToTimerFormat,
};

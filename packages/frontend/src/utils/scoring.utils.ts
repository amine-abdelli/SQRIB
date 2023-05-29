function round(number: number, n: number = 0): number {
  return +Math.round(number).toFixed(n);
}

function calculateWPM(
  originalWords: string[],
  userTypedWords: string[],
  startTime: number,
  endTime: number,
): number {
  const elapsedTime = (endTime - startTime) / 1000 / 60; // Convert time to minutes
  let correctLettersCount = 0;

  // Iterate through userTypedWords and compare to originalWords
  for (let i = 0; i < userTypedWords.length; i += 1) {
    if (originalWords[i] === userTypedWords[i]) {
      correctLettersCount += userTypedWords[i].length;
    }
  }

  // Calculate WPM (considering that 1 WPM is 5 letters typed correctly)
  const wpm = correctLettersCount / 5 / elapsedTime;
  return round(wpm) || 0;
}

function calculateAccuracy(
  originalWords: string[],
  userTypedWords: string[],
): number {
  let correctCharacters = 0;
  let totalCharacters = 0;

  for (let i = 0; i < userTypedWords.length; i += 1) {
    const originalWord = originalWords[i] || '';
    const userTypedWord = userTypedWords[i] || '';

    // Count the total characters in userTypedWords
    totalCharacters += userTypedWord.length;

    // Iterate through the characters in each word and compare them
    for (let j = 0; j < Math.min(originalWord.length, userTypedWord.length); j += 1) {
      if (originalWord[j] === userTypedWord[j]) {
        correctCharacters += 1;
      }
    }
  }

  // Calculate accuracy
  const accuracy = (correctCharacters / totalCharacters) * 100;
  return round(accuracy, 1) || 0;
}

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

function convertSecondsToTimer(timer: number): string {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export {
  calculateWPM, calculateAccuracy, calculatePoints, convertSecondsToTimer,
};

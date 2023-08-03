import { COLORS } from '../theme/colors';

function getTextDecorationColor(
  word: string,
  comparison: string,
  indexOfProgression: number,
  currentIndex: number,
): string {
  if (indexOfProgression < currentIndex) {
    return '';
  } if (word !== comparison && indexOfProgression > currentIndex) {
    return `underline ${COLORS.ERROR}`;
  }
  return '';
}

function getLetterColor(
  letterOfReference: string,
  typedLetter: string,
  indexOfProgression: number,
  currentIndex: number,
  isFocused: boolean,
): string {
  if (indexOfProgression < currentIndex) {
    return COLORS.GREY;
  } if (letterOfReference === typedLetter) {
    return COLORS.BLACK;
  } if (letterOfReference !== typedLetter && !isFocused) {
    return COLORS.ERROR;
  }
  return '';
}

function getFocusedWordLetterColor(
  letterOfReference: string,
  typedLetter: string,
  indexOfcurrentLetter: number,
  currentIndex: number,
): string {
  const hasPassed = indexOfcurrentLetter < currentIndex;
  if (hasPassed && letterOfReference === typedLetter) {
    return COLORS.GOLD;
  } if (letterOfReference !== typedLetter && hasPassed) {
    // ! IMPORTANT TODO ADD LETTER INTO THE ARRAY OF MISSPELLINGS
    return COLORS.ERROR;
  }
  return COLORS.GREY;
}

function getRGBA(letter: string, array: string[]): string {
  const count = array.filter(item => item === letter).length;
  const alpha = count >= 10 ? 1 : count / 10;
  
  return count > 0 ? `rgba(243, 18, 96, ${alpha})` : '#FFFFFF';
}

function expressKeyStyleProperty(e: string, pressedKey: string, misspellings: string[]) {
  if (e === 'Escape') {
    return '#FFFFFF';
  }
  if (pressedKey === e) {
    return '#D69C5D';
  }
  return getRGBA(e, misspellings);
}


export { getTextDecorationColor, getLetterColor, getFocusedWordLetterColor, getRGBA, expressKeyStyleProperty };

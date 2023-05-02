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
    return COLORS.ERROR;
  }
  return COLORS.GREY;
}

export { getTextDecorationColor, getLetterColor, getFocusedWordLetterColor };

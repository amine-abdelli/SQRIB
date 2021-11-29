import * as fr from '../dictionnaries/fr/fr.json';
import * as en from '../dictionnaries/en/en.json';
import { Language } from './enums/Language.enum';
import { IGameOption } from './mode';
import { Colors } from './enums/Colors.enum';

export const specialCharacterRegex = /[^\w\s]/gi;

const dictionnary_fr = fr.map((a) => a.label);
const dictionnary_en = en.map((a) => a.label);

function levelGenerator(array: string[]): any {
  return {
    easy: array.filter((
      a: any,
    ) => a.length <= 5 && !a.match(specialCharacterRegex)), // No accent <= 5
    medium: array.filter((
      a: any,
    ) => a.length <= 8 && !a.match(specialCharacterRegex)), // less 5 word with accent per set
    hard: array.filter((a: any) => a.length > 5), // More than 5 character with accent
  };
}

// /* Generate randomly a 300 long array of words*/
function shuffleWordsStack(lang: string, gameOptions: IGameOption, level = 'easy') {
  let data: string[];
  switch (lang) {
    case Language.FR:
      data = levelGenerator(dictionnary_fr)[level];
      break;
    case Language.EN:
      data = levelGenerator(dictionnary_en)[level];
      break;
    default: console.log('Language not found !');
  }
  return Array.from({ length: gameOptions?.stackLength || 300 }, () => data[
    getRandomWordIndex(data.length - 1)]);
}

/* Return random index */
function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
}

/* Split word to spans */
function splitStringToSpans(string: string, userInput: string) {
  const newString = string?.split('').map((letter, i) => {
    if (i < userInput.length) {
      return (<span key={`${letter + i}`} style={{ color: textColorOnTyping(string, userInput, i) }}>{i === 0 ? ` ${letter}` : letter}</span>);
    }
    return (<span key={`${letter + i}`}>{i === 0 ? ` ${letter}` : letter}</span>);
  });
  return <span>{newString}</span>;
}

/* Save letter's position. It helps to position triangle's */
function lettersPosition(
  e: any,
  userInput: string,
  letter: string,
  i: number,
  setHorizontalPosition: any,
  setLetterWidth: any,
) {
  if (userInput[i] === letter) {
    setHorizontalPosition(e?.getBoundingClientRect().x);
    setLetterWidth(e?.getBoundingClientRect().width);
  }
}

/* Takes a string as parameter and split words into letters wrapped into span
and store letter's position */
function spreadLetters(
  string: string,
  userInput: string,
  setHorizontalPosition: any,
  setLetterWidth: any,
) {
  const newString = string?.split('').map((letter, i) => (
    <span
      ref={(e: any) => lettersPosition(
        e,
        userInput,
        letter,
        i,
        setHorizontalPosition,
        setLetterWidth,
      )}
      key={`${i + letter}`}
    >
      {i === 0 ? ` ${letter}` : letter}
    </span>
  ));
  return newString;
}

/* Color letters accordingly */
function textColorOnTyping(string: string, userInput: string, i: number) {
  if (userInput[i] === string[i]) {
    return Colors.GREEN;
  } if (!userInput) {
    return Colors.BLACK;
  } if ((userInput[i] !== string[i])) {
    return Colors.RED;
  }
  return Colors.BLACK;
}

/* Color computed words in red or green depending on if they've been typed properly */
function setComputedWordsColor(
  word: string,
  i: number,
  wordIndex: number,
  correctWords: Array<string>,
) {
  if (i < wordIndex) {
    return correctWords.includes(word) ? Colors.GREEN : Colors.RED;
  }
  return '';
}

// function randNameElite(): string {
//   var pairs = "..lexegezacebiso"
//               "usesarmaindirea."
//               "eratenberalaveti"
//               "edorquanteisrion";

//   var pair1 = 2 * Math.floor(Math.random() * (pairs.length / 2));
//   var pair2 = 2 * Math.floor(Math.random() * (pairs.length / 2));
//   var pair3 = 2 * Math.floor(Math.random() * (pairs.length / 2));
//   var pair4 = 2 * Math.floor(Math.random() * (pairs.length / 2));

//   var name = "";
//   name += pairs.substr(pair1, 2);
//   name += pairs.substr(pair2, 2);
//   name += pairs.substr(pair3, 2);
//   name += pairs.substr(pair4, 2);
//   name = name.replace(/[.]/g, "");

//   return name;
// }

export {
  shuffleWordsStack, getRandomWordIndex, splitStringToSpans, setComputedWordsColor, spreadLetters,
};

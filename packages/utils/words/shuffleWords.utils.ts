import fr from '../dictionnaries/fr/fr.json';
import en from '../dictionnaries/en/en.json';
import de from '../dictionnaries/de/de.json';
import es from '../dictionnaries/es/es.json';
import { getRandomWordIndex } from '..';

const dictionnary_fr: string[] = fr?.map(({ label }) => label);
const dictionnary_en: string[] = en?.map(({ label }) => label);
const dictionnary_de: string[] = de?.map(({ label }) => label);
const dictionnary_es: string[] = es?.map(({ label }) => label);

export const specialCharacterRegex: RegExp = /[^\w\s]/gi;

function mixUpWordsSet(array: string[], setLength: number) {
  return Array.from({ length: setLength }, () => array[
    getRandomWordIndex(array.length - 1)
  ]);
}

function setGenerator(array: string[]): any {
  const easy: string[] = array.filter((
    word: any,
  ) => word.length <= 5 && !word.match(specialCharacterRegex));
  const medium: string[] = array.filter((
    word: any,
  ) => word.length <= 10 && !word.match(specialCharacterRegex));
  const hard: string[] = array.filter((word: any) => word.length > 5);

  const easySet: string[] = mixUpWordsSet(easy, 200); // No accent <= 5
  const mediumSet: string[] = mixUpWordsSet(medium, 80); // less 5 word with accent per set
  const hardSet: string[] = mixUpWordsSet(hard, 20); // More than 5 character with accent

  return [...easySet, ...mediumSet, ...hardSet];
}

// /* Generate randomly a 300 long array of words*/
export function shuffleWordsStack(lang: string, setLength: number) {
  switch (lang) {
    case 'fr':
      return mixUpWordsSet(setGenerator(dictionnary_fr), setLength);
    case 'en':
      return mixUpWordsSet(setGenerator(dictionnary_en), setLength);
    case 'de':
      return mixUpWordsSet(setGenerator(dictionnary_de), setLength);
    case 'es':
      return mixUpWordsSet(setGenerator(dictionnary_es), setLength);
    default: mixUpWordsSet(setGenerator(dictionnary_fr), setLength);
  }
  return [];
}

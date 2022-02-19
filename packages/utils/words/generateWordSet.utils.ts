import _ from 'lodash';
import fr from '../dictionnaries/fr/fr.json';
import en from '../dictionnaries/en/en.json';
import de from '../dictionnaries/de/de.json';
import es from '../dictionnaries/es/es.json';

const dictionnary_fr: string[] = fr?.map(({ label }) => label);
const dictionnary_en: string[] = en?.map(({ label }) => label);
const dictionnary_de: string[] = de?.map(({ label }) => label);
const dictionnary_es: string[] = es?.map(({ label }) => label);

export const specialCharacterRegex: RegExp = /[^\w\s]/gi;

function shuffleWordSet(array: string[], setLength: number) {
  return _.shuffle(array).slice(0, setLength);
}

function setGenerator(array: string[]): any {
  const easy: string[] = array.filter((
    word: any,
  ) => word.length <= 5 && !word.match(specialCharacterRegex));
  const medium: string[] = array.filter((
    word: any,
  ) => word.length <= 10 && !word.match(specialCharacterRegex));
  const hard: string[] = array.filter((word: any) => word.length > 5);

  const easySet: string[] = shuffleWordSet(easy, 200); // No accent <= 5
  const mediumSet: string[] = shuffleWordSet(medium, 80); // less 5 word with accent per set
  const hardSet: string[] = shuffleWordSet(hard, 20); // More than 5 character with accent

  return [...easySet, ...mediumSet, ...hardSet];
}

// /* Generate randomly a 300 long array of words*/
export function generateWordSet(lang: string, setLength: number) {
  switch (lang) {
    case 'fr':
      return shuffleWordSet(setGenerator(dictionnary_fr), setLength);
    case 'en':
      return shuffleWordSet(setGenerator(dictionnary_en), setLength);
    case 'de':
      return shuffleWordSet(setGenerator(dictionnary_de), setLength);
    case 'es':
      return shuffleWordSet(setGenerator(dictionnary_es), setLength);
    default: shuffleWordSet(setGenerator(dictionnary_fr), setLength);
  }
  return [];
}

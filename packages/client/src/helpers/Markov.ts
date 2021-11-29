/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import _ from 'lodash';
import fr from '../dictionnaries/fr/fr.json';

function computeTransitions(database: any) {
  const transitions = {};

  for (let i = 0; i < database.length; i += 1) {
    const word = database[i];
    let prev = '^';
    let next = '';

    for (let j = 0; j < word.length; j += 1) {
      next = word.substr(j, 1);
      updateTransitions(transitions, prev, next);
      prev = next;
    } // for j

    next = '$';
    updateTransitions(transitions, prev, next);
  } // for i

  return transitions;
} // computeTransitions

function updateTransitions(transitions: any, prev: any, next: any) {
  const key = prev + next;
  if (transitions.hasOwnProperty(key)) { // transition déjà existante
    transitions[key] += 1;
  } else { // new transition
    transitions[key] = 1;
  }
}

function markov(state: any, transitions: any) {
  const cumDist = []; // Fonction de répartition
  let sum = 0;

  // Calcule la fonction de répartition des transitions de l'état
  for (const key in transitions) {
    if (transitions.hasOwnProperty(key) // spécifique JavaScript
      && key.substr(0, state.length) === state) {
      sum += transitions[key];
      const nextState = key.substr(state.length);
      cumDist.push({ nextState, cumFreq: sum });
    }
  } // for key

  // Choisit au hasard le prochain état
  const random = Math.floor(sum * Math.random());

  for (let i = 0; i < cumDist.length; i += 1) {
    const { nextState } = cumDist[i];
    const { cumFreq } = cumDist[i];
    if (random < cumFreq) {
      return nextState;
    }
  }
  return '';
}

function randNameMarkov(transitions: any) {
  let state = '^';
  let result = '';

  while (state !== '$') {
    const newLetter = markov(state, transitions);
    result += newLetter;
    state = newLetter;
  }

  return result.substr(0, result.length - 1); // supprime $ en fin de résultat
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
type WordLabel = { label: string}

export function generate(index: number) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'é', 'è', 'ç'];

  const array: Array<string> = [];
  const preProcessedArray = fr.filter((word: WordLabel) => !_.intersection(word.label.split(''), letters.slice(index + 1, letters.length)).length);
  for (let k = 0; array.length < 50; k += 1) {
    const randomlyGeneratedWord = randNameMarkov(
      computeTransitions(preProcessedArray.map((w: WordLabel) => w.label)),
    );
    if (randomlyGeneratedWord.includes(
      letters[index - 1],
    ) && !array.includes(randomlyGeneratedWord)
    && randomlyGeneratedWord.length > 2 && randomlyGeneratedWord.length < randomInteger(3, 8)) {
      array.push(randomlyGeneratedWord);
    }
  }
  return {
    array,
    letter: letters[index - 1],
  };
}

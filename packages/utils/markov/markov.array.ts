/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */

function updateTransitions(transitions: any, prev: any, next: any) {
  const key = prev + next;
  if (transitions.hasOwnProperty(key)) { // transition déjà existante
    transitions[key] += 1;
  } else { // new transition
    transitions[key] = 1;
  }
}

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

function markov(state: string, transitions: any) {
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

function randWordMarkov(transitions: any) {
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

function combinator(s: any) {
  const list_of_strings: any[] = [];
  for (let i = 0; i < s.length; i += 1) {
    for (let j = i + 1; j < s.length + 1; j += 1) {
      list_of_strings.push(s.slice(i, j));
    }
  }
  return list_of_strings;
}

// Given an index this function will generate random words in the corresponding range
function generate(index: number) {
  const alphabet: string[] = ['E', 'I', 'R', 'A', 'N', 'S', 'O', 'L', 'U', 'T', 'Y', 'M', 'D', 'C', 'H', 'É', 'G', 'P', 'B', 'K', 'F', 'V', 'W', 'È', 'X', 'Q', 'Z', 'J', 'Ç'];
  const array: Array<string> = [];

  for (let k = 0; array.length < 50; k += 1) {
    const combination = combinator(alphabet.slice(0, index)).map((str: any) => str.join(''));
    const randomlyGeneratedWord = randWordMarkov(
      computeTransitions(combination),
    );
    if (randomlyGeneratedWord.length > 1 && randomlyGeneratedWord.length < randomInteger(3, 8)) {
      array.push(randomlyGeneratedWord);
    }
  }
  return {
    array,
    letter: alphabet[index - 1],
  };
}

export { generate };

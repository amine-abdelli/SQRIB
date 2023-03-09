/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */

export const dictionnary = `agnès alain albert alexandre annabelle anne
  baptiste béatrice benoit carl caroline cécile
  christine christophe emmanuel emmanuelle emilie
  éric eve frédéric gaspard henri henriette
  isabelle jean jeanne jennifer joseph léa louis
  marc marie marion maxime michel nathalie nicole
  noémie olivia olivier patrick paul philippe
  pierre rené robert sébastien sophie stéphane
  stéphanie thierry`.split(' ');

function updateTransitions(transitions: any, prev: string, next: string) {
  const key = prev + next;
  if (transitions.hasOwnProperty(key)) { // transition déjà existante
    transitions[key] += 1;
  } else { // new transition
    transitions[key] = 1;
  }
} // updateTransitions

function computeTransitions(database: string[]): any {
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

function markov(state: string, transitions: any): string {
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
  } // for i

  return '';
} // markov

function randNameMarkov(transitions: Object): string {
  let state = '^';
  let result = '';

  while (state !== '$') {
    const newLetter = markov(state, transitions);
    result += newLetter;
    state = newLetter;
  } // while

  return result.substr(0, result.length - 1); // supprime $ en fin de résultat
} // randNameMarkov

/**
 * Generate one random word
 * @param db Takes a string of words
 * @returns A randomly generated word
 */
function generator(db: any) {
  const computedTransition = computeTransitions(db);
  return randNameMarkov(computedTransition);
}

export { generator };

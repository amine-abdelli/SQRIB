import { generateRandomWordsWithPriority } from './src/utils/markov.utils';

(async () => {
  try {
    console.log('########## BEGIN ##########');
    console.log(generateRandomWordsWithPriority(10, 3, 8, ['e', 'i', 'r', 'a', 'f', 'l'], ['life', 'camembert', 'gentil', 'file']));
    console.log('########## END ##########');
  } catch (e) {
    console.log('an error occurred', e);
  }
})();

import { shuffleWordsStack } from '@aqac/utils';

export async function randomSetService() {
  try {
    const pute = shuffleWordsStack('fr');
    return pute;
  } catch (e) {
    console.log('ERROR', e);
    return '';
  }
}

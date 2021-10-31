import * as words from '../dictionnary/words.json';
import * as pronouns from '../dictionnary/pronouns.json';
import * as articles from '../dictionnary/articles.json';


function shuffleWordsStack() {
  const data = [...words?.map(obj => obj.label), ...pronouns?.map(obj => obj.label), ...articles?.map(obj => obj.label)];
  let currentIndex = data.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [data[currentIndex], data[randomIndex]] = [
      data[randomIndex], data[currentIndex]];
  }
  return Array.from({ length: 300 }, () => data[getRandomWordIndex(data.length - 1)]).map(word => word);
}

function getRandomWordIndex(range: number) {
  return Math.floor(Math.random() * range);
}

function splitStringToSpans(string: string, userInput: string) {
  const newString = string.split('').map((letter, i) => {
    if(i < userInput.length) {
      return (<span style={{ color: textColorOnTyping(string, userInput, i) }} key={i}>{i === 0 ? ' ' + letter : letter}</span>);
    }
    return (<span key={i}>{i === 0 ? ' ' + letter : letter}</span>);
  });
  return newString;
}

function textColorOnTyping(string: string, userInput: string, i: number) {
  if (userInput[i] === string[i]) {
    return 'green';
  } else if (!userInput) {
    return 'black';
  } else if ((userInput[i] !== string[i])) {
    return 'red';
  }
}
  
function setComputedWordsColor(word: string, i: number, wordIndex: number, computedWords: Array<string>){
  if(i < wordIndex) {
    return computedWords.includes(word) ? 'green' : 'red'
  }
  return '';
}


export { shuffleWordsStack, getRandomWordIndex, splitStringToSpans, setComputedWordsColor };
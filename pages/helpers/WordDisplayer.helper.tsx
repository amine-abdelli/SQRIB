function shuffleWordsStack(array: string[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return Array.from({ length: 300 }, () => array[getRandomWordIndex(array.length - 1)]).map(word => word);
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


export { shuffleWordsStack, getRandomWordIndex, splitStringToSpans };
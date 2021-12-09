const fs = require('fs');
// const dictionnary = require('../fr/fr.json');

// const specialCharacter = /[^\w\s]/gi;

// const duplicateFreeDictionnary = Array.from(new Set(dictionnary?.map((dic) => dic.label)));

// function getRandomWordIndex(range) {
//   return Math.floor(Math.random() * range);
// }

// const shuffleWordStack = (array, length) => Array.from({ length },
// () => array[getRandomWordIndex(easy.length - 1)]);

// const easy = duplicateFreeDictionnary.filter(
// (a) => a.length <= 5 && !a.match(specialCharacter)); // No accent <= 5
// const count = 0;
// const medium = duplicateFreeDictionnary.filter(
// (a) => a.length <= 8 && !a.match(specialCharacter)); // less 5 word with accent per set
// const hard = duplicateFreeDictionnary.filter(
// (a) => a.length > 5); // More than 5 character with accent

// Extract text and build json from it
const lines = fs.readFileSync('./es/es.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);
const array = [];
lines.forEach((line) => array.push({
  label: line.toLowerCase(),
}));

fs.writeFileSync('./es/es.json', JSON.stringify(array));

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let counter = 0;
const min = 100000000;
const max = 999999999;
const WINNER = 532987987;
let SUCCESS_NUM = getRndInteger(min, max);

while (WINNER !== SUCCESS_NUM) {
  counter += 1;
  console.log(getRndInteger(min, max));
  SUCCESS_NUM = getRndInteger(min, max);
}

console.log('counter', counter);
console.log('theWinnerIs', SUCCESS_NUM);

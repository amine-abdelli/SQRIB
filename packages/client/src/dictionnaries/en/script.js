const fs = require('fs');

const lines = fs.readFileSync('en.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

let array = [];
  lines.forEach((line) => array.push({
    label: line
  }));

  fs.writeFileSync('en.json', JSON.stringify(array));
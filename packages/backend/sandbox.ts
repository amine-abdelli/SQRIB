/* eslint-disable max-len */
// import { prisma } from './src/client';
const fs = require('fs');
const csv = require('csv-parser');

(async () => {
  try {
    let count = 0; // Counter to track the number of rows processed
    const maxRows = 10; // Maximum rows to read

    fs.createReadStream('off.csv') // Replace 'yourfile.csv' with your file path
      .pipe(csv())
      .on('data', (row) => {
        if (count < maxRows) {
          console.log(row); // Process each row here
          count += 1;
        }
      })
      .on('end', () => {
        console.log('Read first 10 rows successfully.');
      });
  } catch (e) {
    console.log('an error occurred', e);
  }
})();

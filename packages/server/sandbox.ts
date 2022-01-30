import { prisma } from './src/client';

(async () => {
  try {
    // Your code goes here...
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

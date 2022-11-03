import { prisma } from './src/client';

(async () => {
  try {
    const currentDate = new Date();
    console.log(currentDate);
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

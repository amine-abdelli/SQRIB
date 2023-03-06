import { prisma } from './src/client';

(async () => {
  try {
    //
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

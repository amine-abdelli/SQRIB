import { prisma } from './src/client';

(async () => {
  try {
    // Write your prisma query here
    // const users = await prisma.user.findMany();
    // console.log(users);
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

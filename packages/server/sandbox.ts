import { generator } from '@aqac/utils';
import { prisma } from './src/client';

(async () => {
  try {
    const database = `agnès alain albert alexandre annabelle anne
  baptiste béatrice benoit carl caroline cécile
  christine christophe emmanuel emmanuelle emilie
  éric eve frédéric gaspard henri henriette
  isabelle jean jeanne jennifer joseph léa louis
  marc marie marion maxime michel nathalie nicole
  noémie olivia olivier patrick paul philippe
  pierre rené robert sébastien sophie stéphane
  stéphanie thierry`.split(' ');
    const hey = generator(database);
    console.log('hey', hey);
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

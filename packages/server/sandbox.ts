import { objectToQueryString } from './src/utils';
import { prisma } from './src/client';

(async () => {
  try {
    const foo = {
      password: 'string',
      nickname: 'string',
      avatar: 'string',
      rank: 'string',
      xp: 'number',
      lastPasswordReset: 'Date',
      last_activity: 'Date',
      is_active: 'boolean',
      brotherHoodId: 'string',
      didacticiel_level: 'number',
    };

    const updateUserQuery = `UPDATE public."User"
    SET ${objectToQueryString(foo)}
    WHERE id = 'foutre';`;
    console.log(updateUserQuery);
  } catch (e) {
    console.log('an error occurred', e);
  }
  await prisma.$disconnect();
})();

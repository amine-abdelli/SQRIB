import { Game } from '@sqrib/utils';
import { findManyScoresByType } from '../../repositories/game/findManyScoresByType.repository';
import { findManyGamesWithDetails, oneUserById } from '../../repositories';
import { fetchScoringDataArgs } from '../../resolvers/game';
import { Context } from '../../utils';

export async function fetchUserGamingDetailsService(
  { userId }: fetchScoringDataArgs,
  { prisma }: Context,
) {
  const solo = await findManyScoresByType({ userId, type: Game.SOLO }, prisma);
  const multi = await findManyGamesWithDetails({ userId }, prisma);
  const user = await oneUserById({ id: userId });
  const details = {
    last_activity: user?.last_activity,
    created_at: user?.created_at,
    nickname: user?.nickname,
  };
  return { multi, solo, details };
}

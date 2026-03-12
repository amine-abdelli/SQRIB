import { log } from '@sqrib/utils';
import { fetchUserGamingDetailsService } from '../../services/game/fetchUserGamingDetailsService.service';
import { Context } from '../../utils';

export interface fetchScoringDataArgs {
  userId: string
}

export async function fetchUserGamingDetails(
  parent: any,
  { userId }: fetchScoringDataArgs,
  context: Context,
) {
  log.info(`Trying to fetch gaming details for user: ${userId}`);
  const gamingUserDetails = await fetchUserGamingDetailsService({ userId }, context);
  log.info(`Gaming details fetched successfully for user: ${userId}`);
  return gamingUserDetails;
}

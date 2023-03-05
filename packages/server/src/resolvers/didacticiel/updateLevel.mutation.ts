import { log } from '@sqrib/utils';
import { updateLevelService } from '../../services/didacticiel/updateLevelService.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateLevel {
  level: number,
}

export async function updateLevel(parent: any, args: IUpdateLevel, context: Context) {
  log.info({ args }, 'Trying to update level');
  const level = await updateLevelService(args, context);
  log.info({ args }, 'Level updated successfully', { args });
  return level.didacticiel_level;
}

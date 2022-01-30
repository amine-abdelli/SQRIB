import { updateLevelService } from '../../services/didacticiel/updateLevelService.service';
import { Context } from '../../utils/context.utils';

export interface IUpdateLevel {
  level: number,
}

export async function updateLevel(parent: any, args: IUpdateLevel, context: Context) {
  const level = await updateLevelService(args, context);
  return level.didacticiel_level;
}

import { Game, GameType, ScoreType } from '@sqrib/utils';

export interface DetailsHeaderProps {
  scores: ScoreType[] | GameType[],
  lastActivity: string,
  type: Game,
  games?: GameType[],
  details?: {
    created_at: string
    nickname: string
    last_activity: string
  }
}

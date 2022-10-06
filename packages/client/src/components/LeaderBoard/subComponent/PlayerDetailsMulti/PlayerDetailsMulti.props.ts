import { GameType } from '@sqrib/utils';

export interface PlayerDetailsMultiProps {
  games: GameType[]
  details: {
    created_at: string
    nickname: string
    last_activity: string
  }
}

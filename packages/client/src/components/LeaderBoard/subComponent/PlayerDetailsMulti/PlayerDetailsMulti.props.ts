import { GameType } from '@aqac/utils';

export interface PlayerDetailsMultiProps {
  games: GameType[]
  details: {
    createdAt: string
    nickname: string
    lastActivity: string
  }
}

import { GameType, ScoreType } from '@aqac/utils';

export interface PlayerDetailsProps {
  data: {
    multi: GameType[]
    solo: ScoreType[]
    details: {
      createdAt: string
      nickname: string
      lastActivity: string
    }
  }
  loading: boolean
}

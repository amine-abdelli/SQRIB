import { GameType, ScoreType } from '@aqac/utils';

export interface PlayerDetailsProps {
  data: {
    multi: GameType[]
    solo: ScoreType[]
    details: {
      created_at: string
      nickname: string
      last_activity: string
    }
  }
  loading: boolean
}

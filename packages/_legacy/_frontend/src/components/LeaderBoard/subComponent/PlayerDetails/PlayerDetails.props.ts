import { GameType, ScoreType } from '@sqrib/utils';

export interface PlayerDetailsProps {
  data: {
    multi: GameType[]
    solo: ScoreType[]
    details: {
      created_at: string
      nickname: string
      last_activity: string
    }
  },
  loading: boolean,
  isOpen: boolean,
  setIsOpen: any,
}

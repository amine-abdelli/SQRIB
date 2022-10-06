import { GlobalGamesData, GlobalScoresData } from '@sqrib/api';

export interface LeaderBoardProps {
  scores: GlobalScoresData
  title: string
  winnerBoard?: Record<string, GlobalGamesData[]>
}

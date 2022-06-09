import { GlobalGamesData, GlobalScoresData } from '@aqac/api';

export interface LeaderBoardProps {
  scores: GlobalScoresData
  title: string
  winnerBoard?: Record<string, GlobalGamesData[]>
}

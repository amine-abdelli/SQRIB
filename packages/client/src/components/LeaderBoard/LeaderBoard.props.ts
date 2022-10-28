import { GlobalGamesData, GlobalScoresData } from '@sqrib/api';
import { CSSProperties } from 'react';
import { ColumnProps } from '../../UI/Table/Table.props';

export interface LeaderBoardProps {
  scores: GlobalScoresData,
  title: string,
  winnerBoard?: Record<string, GlobalGamesData[]>,
  style?: CSSProperties,
  columns: ColumnProps[] | any,
}

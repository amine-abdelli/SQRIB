export interface IScoreCardProps {
  content: string | number;
  title: string;
  highlight?: boolean;
  best?: boolean;
  unit?: string;
  stat?: boolean;
  bonus?: boolean;
  malus?: boolean;
}

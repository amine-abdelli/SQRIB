export interface IScoreCardProps {
  content: string | number | Element | any;
  title: string;
  highlight?: boolean;
  best?: boolean;
  unit?: string;
  stat?: boolean;
  bonus?: boolean;
  malus?: boolean;
}

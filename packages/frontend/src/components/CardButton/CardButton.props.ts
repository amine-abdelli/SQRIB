export interface CardButtonProps {
  label: string;
  subLabel?: string;
  secondary?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  classNames?: string;
  color?: string;
  shadowed?: boolean;
}
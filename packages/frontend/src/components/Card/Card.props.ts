export interface CardProps {
  shadowed?: boolean;
  children?: React.ReactNode;
  background?: 'dark' | 'light';
  width?: string | number;
  className?: string;
  centered?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}
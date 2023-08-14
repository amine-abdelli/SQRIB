export interface TooltipProps {
  children: JSX.Element;
  content: JSX.Element | string;
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom';
  enable?: boolean;
  size?: number;
}
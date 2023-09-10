import { HTMLProps } from 'react';

export interface TextProps extends HTMLProps<HTMLParagraphElement | HTMLHeadingElement> {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  p?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  centered?: boolean;
  thin?: boolean;
  size?: number;
  background?: string;
  fira?: boolean;
  style?: React.CSSProperties;
}

import React, { FC } from 'react';
import { TextProps } from './Text.props';
import './Text.style.scss';

const Text: FC<TextProps> = ({ h1, h2, h3, p, bold, color, italic, centered, underline, thin, size, children, className = '', ...props }) => {
  let Component: keyof JSX.IntrinsicElements = 'span'; // Default component type
  if (p) Component = 'p';
  if (h1) Component = 'h1';
  if (h2) Component = 'h2';
  if (h3) Component = 'h3';

  const classes = [
    'text',
    h1 ? 'h1' : '',
    h2 ? 'h2' : '',
    h3 ? 'h3' : '',
    bold ? 'bold' : '',
    italic ? 'italic' : '',
    underline ? 'underline' : '',
    centered ? 'centered' : '',
    thin ? 'thin' : '',
    className
  ].join(' ').trim();

  return (
    <Component className={classes} style={{ color, fontSize: size ? size : '' }} {...props}>
      {children}
    </Component>
  );
};

export { Text };

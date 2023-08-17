import React, { CSSProperties } from 'react';

type Label = string | number | JSX.Element;

export interface ButtonProps {
  onClick: () => void;
  secondary?: boolean;
  stretch?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
  light?: boolean;
  color?: string;
  className?: any;
  label?: React.ReactNode & Label;
  children?: React.ReactNode & Label;
  link?: boolean;
}

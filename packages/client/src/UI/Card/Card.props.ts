import React, { CSSProperties } from 'react';

export interface CardProps {
  children: React.ReactNode,
  styles?: CSSProperties,
  shadowed?: boolean,
  width?: string,
  minWidth?: string
}

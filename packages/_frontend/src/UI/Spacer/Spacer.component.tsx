import React from 'react';
import { SpacerProps } from './Spacer.props';

function Spacer({ w = '10', h }: SpacerProps) {
  return (
    <div style={{ width: `${w}px`, height: `${h}px` }} />
  );
}

export default Spacer;

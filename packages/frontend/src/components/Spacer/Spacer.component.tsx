import React from 'react';
import './Spacer.style.scss';

interface SpacerProps {
  size: 'small' | 'medium' | 'large',
  x?: boolean,
  y?: boolean,
}

function Spacer({ size, x, y }: SpacerProps) {
  return <div className={`spacer-${size} ${x && 'horizontal'} ${y && 'vertical'}`} />;
}

export { Spacer };

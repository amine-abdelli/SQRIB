import React from 'react';
import './Spacer.style.scss';

interface SpacerProps {
  size: 'small' | 'medium' | 'large';
}

function Spacer({ size }: SpacerProps) {
  return <div className={`spacer-${size}`} />;
}

export { Spacer };

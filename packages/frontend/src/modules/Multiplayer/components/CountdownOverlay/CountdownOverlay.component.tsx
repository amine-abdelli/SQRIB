import React from 'react';
import './CountdownOverlay.style.scss';

interface CountdownOverlayProps {
  count: number;
}

const CountdownOverlay = ({ count }: CountdownOverlayProps) => {
  const label = count <= 0 ? 'GO!' : `${count}`;
  const isGo = count <= 0;

  return (
    <div className='countdown-overlay'>
      <div className={`countdown-overlay__circle ${isGo ? 'countdown-overlay__circle--go' : ''}`}>
        <span className='countdown-overlay__label'>{label}</span>
      </div>
    </div>
  );
};

export { CountdownOverlay };

import React from 'react';
import { ScoreItemProps } from '../Scoring.props';
import '../Scoring.style.scss';

function ScoringItem({ content, color }: ScoreItemProps) {
  return (
    <p className='scoring-item' style={{ color }}>
      {content}
    </p>
  );
}

ScoringItem.defaultProps = {
  color: 'inherit',
};

export { ScoringItem };

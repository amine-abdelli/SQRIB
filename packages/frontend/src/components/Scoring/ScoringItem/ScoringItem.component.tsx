import React from 'react';
import { ScoreItemProps } from '../Scoring.props';
import '../Scoring.style.scss';

function ScoringItem({ label, value, color }: ScoreItemProps) {
  return (
    <p className='scoring-item' style={{ color }}>
      <span className='scoring-item--value'>{value}</span><span className='scoring-item--label'>{label}</span>
    </p>
  );
}

ScoringItem.defaultProps = {
  color: 'inherit',
};

export { ScoringItem };

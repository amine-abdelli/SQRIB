import React from 'react';
import '../Scoring.module.scss';

interface IScoreItemProps {
  content: string | number | undefined;
  color?: string;
}
function ScoringItem({ content, color }: IScoreItemProps) {
  return (
    <p style={{ color, margin: 0 }}>
      {content}
    </p>
  );
}

ScoringItem.defaultProps = {
  color: 'inherit',
};

export default ScoringItem;

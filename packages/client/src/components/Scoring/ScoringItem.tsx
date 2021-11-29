import React from 'react';
import { Colors } from '../../helpers/enums/Colors.enum';
import './Scoring.module.scss';

interface IScoreItemProps {
  content: string | number | undefined;
  color?: string;
}
const ScoringItem = function ({ content, color }: IScoreItemProps) {
  return (
    <p style={{ color, margin: 0 }}>
      {content}
    </p>
  );
};

ScoringItem.defaultProps = {
  color: Colors.BLACK,
};

export default ScoringItem;

import React from 'react';
import { CountDown } from '../CountDown/CountDown.component';
import { ScoringItem } from './ScoringItem/ScoringItem.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import Avatar from '../Avatar/Avatar.component';
import './Scoring.style.scss';
import { EngineProps } from '../Engine';

function Scoring({ score, timer }: EngineProps) {
  const nickname = 'Narstonerz';
  const { isSmallScreen, isLargeScreen, isVerySmallScreen } = useWindowSize();

  return (
      <div className="scoring--wrapper">
        {nickname && <Avatar username={nickname} size='small' />}
        {!isSmallScreen && <ScoringItem content={`Mots saisies : ${score.typedWords}`} />}
        {!isVerySmallScreen && <ScoringItem content={`Précision : ${score.accuracy}%`} />}
        <ScoringItem content={`Mpm : ${score.wpm}`} />
        {!isLargeScreen && <ScoringItem content={`Points : ${score.points}`} />}
        <CountDown timer={timer} />
      </div>
  );
}

export { Scoring };

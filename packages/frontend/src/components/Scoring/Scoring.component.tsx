import React from 'react';
import { CountDown } from '../CountDown/CountDown.component';
import { ScoringItem } from './ScoringItem/ScoringItem.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import Avatar from '../Avatar/Avatar.component';
import './Scoring.style.scss';
import { OptionModalProps } from '../../modules/Training/components/OptionModal';
import { Button } from '../Button/Button.component';
import { Setting } from 'react-iconly';
import { Spacer } from '../Spacer';

function Scoring({ score, timer, setShouldDisplayOption }: OptionModalProps) {
  const nickname = 'Narstonerz';
  const { isSmallScreen, isLargeScreen, isVerySmallScreen } = useWindowSize();

  return (
    <div className="scoring">
      <div className="scoring--wrapper">
        {nickname && <Avatar username={nickname} size='small' />}
        {!isSmallScreen && <ScoringItem content={`Mots saisies : ${score.typedWords}`} />}
        {!isVerySmallScreen && <ScoringItem content={`Précision : ${score.accuracy}%`} />}
        <ScoringItem content={`Mpm : ${score.wpm}`} />
        {!isLargeScreen && <ScoringItem content={`Points : ${score.points}`} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CountDown timer={timer} />
        <Spacer x size='medium' />
        <Button label={<>{<Setting set="curved" primaryColor="#D69C5D" />}SETTINGS</>} color="#D69C5D" onClick={() => setShouldDisplayOption((prev) => !prev)} stretch secondary />
      </div>
    </div>
  );
}

export { Scoring };

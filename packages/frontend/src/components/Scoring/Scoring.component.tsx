import React from 'react';
import { CountDown } from '../CountDown/CountDown.component';
import { ScoringItem } from './ScoringItem/ScoringItem.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import Avatar from '../Avatar/Avatar.component';
import './Scoring.style.scss';
import { OptionModalProps } from '../../modules/Training/components/OptionModal';
import { Button } from '../Button/Button.component';
import { AiOutlineEdit } from 'react-icons/ai';
import { Spacer } from '../Spacer';
import { Tooltip } from '../ToolTip/ToolTip.component';

const SETTINGS_CONVERTER: Record<string, string> = {
  speedChallenge: 'Speed Challenge',
  timeTrial: 'Time Trial',
  fr: 'French',
  en: 'English',
  de: 'German',
  es: 'Spanish'
}

const nickname = 'Narstonerz';
function Scoring({ score, timer, setShouldDisplayOption, isRunning, mode, wordCount, language, countDown }: OptionModalProps) {
  const { isSmallScreen, isLargeScreen, isVerySmallScreen } = useWindowSize();
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{SETTINGS_CONVERTER[mode]}</span>
        {mode === 'speedChallenge' ? <span>{wordCount}</span> : <span>{countDown}s</span>}
        <span>{SETTINGS_CONVERTER[language]}</span>
        <span>Random</span>
        {/* Add tool tip to explain why it can't be */}
        <Tooltip content="Stop the game to edit game settings" direction='bottom-left' enable={isRunning}>
          <Button disabled={isRunning} light label={<>{<AiOutlineEdit color={isRunning ? 'grey' : ''} size={22} />}</>} onClick={() => setShouldDisplayOption((prev) => !prev)} secondary />
        </Tooltip>
      </div>
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
        </div>
      </div>
    </>
  );
}

export { Scoring };

import React from 'react';
import { CountDown } from '../CountDown/CountDown.component';
import { ScoringItem } from './ScoringItem/ScoringItem.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import Avatar from '../Avatar/Avatar.component';
import { OptionIcon, OptionModalProps } from '../../modules/Training/components/OptionModal';
import { Button } from '../Button/Button.component';
import { AiOutlineEdit } from 'react-icons/ai';
import { Spacer, SpacerSize } from '../Spacer';
import { Tooltip } from '../ToolTip/ToolTip.component';
import { Game, TimeCircle } from 'react-iconly';
import { TrainingMode } from '../Options/Options.props';
import { TbSortAscendingNumbers } from 'react-icons/tb';
import { MdOutlineTypeSpecimen } from 'react-icons/md';
import './Scoring.style.scss';
import { IoLanguageOutline } from 'react-icons/io5';
import { COLORS } from '../../theme/colors';

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem', background: '#f5f5f5', height: '3rem', borderRadius: '5px', marginBottom: '0.5rem' }} >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className='summary'>
            <OptionIcon icon={<Game set='light' size={16} />} />
            <Spacer x size={SpacerSize.SMALL} />
            {SETTINGS_CONVERTER[mode]} mode
          </span>
          <Spacer x size={SpacerSize.SMALL} />
          <span className='summary'>
            {mode === TrainingMode.SPEED_CHALLENGE
              ?
              <>
                <OptionIcon icon={<TbSortAscendingNumbers size={16} />} />
                <Spacer x size={SpacerSize.SMALL} />
                {wordCount}
              </>
              : <>
                <OptionIcon icon={<TimeCircle set="light" size={16} />} />
                <Spacer x size={SpacerSize.SMALL} />
                {countDown}s
              </>
            }
          </span>
          <Spacer x size={SpacerSize.MEDIUM} />
          <span className='summary'>
            <OptionIcon icon={<OptionIcon icon={<IoLanguageOutline size={16} />} />} />
            <Spacer x size={SpacerSize.SMALL} />
            {SETTINGS_CONVERTER[language]}
          </span>
          <Spacer x size={SpacerSize.MEDIUM} />
          <span className='summary'>
            <OptionIcon icon={<MdOutlineTypeSpecimen size={16} />} />
            <Spacer x size={SpacerSize.SMALL} />
            Random
          </span>
          <Spacer x size={SpacerSize.MEDIUM} />
        </div>
        {/* Add tool tip to explain why it can't be */}
        <Button disabled={isRunning} color={isRunning ? 'grey' : ''} label={
          <>
            {<AiOutlineEdit color={isRunning ? 'grey' : ''} size={22} />}
            Settings
          </>
        } style={{ fontSize: '16px', margin: '10px', padding: '2px 5px' }} onClick={() => setShouldDisplayOption((prev) => !prev)} secondary stretch />
      </div>
      <div className="scoring">
        <div className="scoring--wrapper">
          {nickname && <Avatar username={nickname} size='small' />}
          {!isSmallScreen && <ScoringItem content={`Mots saisies : ${score.typedWords.length}${mode === TrainingMode.TIME_TRIAL ? '' : '/' + wordCount}`} />}
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

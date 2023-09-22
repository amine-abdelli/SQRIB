import React from 'react';
import { CountDown } from '../CountDown/CountDown.component';
import { ScoringItem } from './ScoringItem/ScoringItem.component';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { SettingsModalProps } from '../../modules/Training/components/SettingsModal';
import { Button } from '../Button/Button.component';
import { AiOutlineEdit } from 'react-icons/ai';
import { Spacer, SpacerSize } from '../Spacer';
import { Game, TimeCircle } from 'react-iconly';
import { TrainingMode } from '../Options/Options.props';
import { TbSortAscendingNumbers } from 'react-icons/tb';
import { MdOutlineTypeSpecimen } from 'react-icons/md';
import './Scoring.style.scss';
import { IoLanguageOutline } from 'react-icons/io5';
import { OptionIcon } from '../../modules/Training/components/SettingsModal/SubComponents/OptionGroup';
import { Languages } from '@sqrib/shared';
import { PiFlowerLotusLight } from 'react-icons/pi';
import { HomeButton } from '../HomeButton/HomeButton.component';

const SETTINGS_CONVERTER: Record<string, string> = {
  [TrainingMode.SPEED_CHALLENGE]: 'Speed Challenge',
  [TrainingMode.TIME_TRIAL]: 'Time Trial',
  [Languages.FR]: 'French',
  [Languages.EN]: 'English',
  [Languages.DE]: 'German',
  [Languages.ES]: 'Spanish'
}

function Scoring({ score, timer, setShouldDisplayOption, isRunning, mode, wordCount, language, countDown, typedWords, isZenModeOn }: SettingsModalProps) {
  const { isSmallScreen, isMediumScreen, isLargeScreen, isVerySmallScreen } = useWindowSize();

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HomeButton />
        <Spacer x size={SpacerSize.SMALL} />
        <div className='session-settings-info--wrapper' >
          <div className='session-settings-info'>
            <Spacer x size={SpacerSize.MEDIUM} />
            <span className='summary'>
              <OptionIcon icon={<Game set='light' size={16} />} />
              <Spacer x size={SpacerSize.SMALL} />
              {SETTINGS_CONVERTER[mode]} mode
            </span>
            <Spacer x size={SpacerSize.SMALL} />
            <span className={`summary ${isMediumScreen ? 'hidden' : ''}`}>
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
            <span className={`summary ${isMediumScreen ? 'hidden' : ''}`}>
              <OptionIcon icon={<OptionIcon icon={<IoLanguageOutline size={16} />} />} />
              <Spacer x size={SpacerSize.SMALL} />
              {SETTINGS_CONVERTER[language]}
            </span>
            <Spacer x size={SpacerSize.MEDIUM} />
            <span className={`summary ${isLargeScreen ? 'hidden' : ''}`}>
              <OptionIcon icon={<MdOutlineTypeSpecimen size={16} />} />
              <Spacer x size={SpacerSize.SMALL} />
              Random
            </span>
            <Spacer x size={SpacerSize.MEDIUM} />
            {isZenModeOn ? <span className={`summary ${isLargeScreen ? 'hidden' : ''}`}>
              <OptionIcon icon={<PiFlowerLotusLight size={16} />} />
              <Spacer x size={SpacerSize.SMALL} />
              Active
            </span> : ''}
          </div>
          {!isVerySmallScreen && <Button
            disabled={isRunning}
            color={isRunning ? 'grey' : ''}
            label={<>
              {<AiOutlineEdit color={isRunning ? 'grey' : ''} size={22} />}
              {!isLargeScreen && 'Settings'}
            </>}
            style={{ fontSize: '16px', margin: '10px', padding: '2px 5px' }}
            onClick={() => setShouldDisplayOption((prev) => !prev)}
            secondary
            stretch
          />}
        </div>
      </div>
      <Spacer y size={SpacerSize.SMALL} />
      <div className="scoring">
        <div className="scoring--wrapper" >
          <ScoringItem label="wpm" value={score.wpm} />
          {!isSmallScreen && <ScoringItem label={mode === TrainingMode.TIME_TRIAL ? "Typed words" : '/' + wordCount} value={`${typedWords.length}`} />}
          {!isMediumScreen && <ScoringItem label="% Accuracy" value={`${score.accuracy}`} />}
          {!isLargeScreen && <ScoringItem label="Points" value={score.points} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CountDown timer={timer} />
        </div>
      </div>
    </>
  );
}

export { Scoring };

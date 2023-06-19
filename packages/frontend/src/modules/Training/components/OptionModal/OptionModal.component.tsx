import React, { useState } from 'react'
import { EngineProps } from '../../Engine'
import Modal from '../../../../components/Modal/Modal.component';
import { TWordsType, TrainingMode, WordsCollectionLayout, WordsType } from '../../../../components/Options/Options.props';
import { FontSize } from '../../../../utils';
import { Button } from '../../../../components/Button/Button.component';
import { COLORS } from '../../../../theme/colors';
import { Languages } from '@sqrib/shared';
import './OptionModal.style.scss';
import { Category, Game, TimeCircle } from 'react-iconly';
import { Spacer, SpacerSize } from '../../../../components';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdOutlineTypeSpecimen } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { TbSortAscendingNumbers } from 'react-icons/tb';

interface OptionProps {
  icon?: any,
  options: (string | number)[];
  selected: string | number,
  setSelected: any,
  label: string,
  subLabel?: string
}

function OptionGroup({
  icon, label, options, selected, setSelected, subLabel
}: OptionProps) {
  const NAME_MATCHING_LIST: Record<string, string> = {
    [TrainingMode.SPEED_CHALLENGE]: 'speed challenge',
    [TrainingMode.TIME_TRIAL]: 'time trial',
    [FontSize.SMALL]: label === 'font size' ? '30' : '',
    [FontSize.MEDIUM]: label === 'font size' ? '36' : '',
    [FontSize.LARGE]: label === 'font size' ? '48' : '',
    [FontSize.X_LARGE]: label === 'font size' ? '60' : '',
  };

  return (
    <div style={{ padding: '0 0.5rem', background: '#f5f5f5', height: '3rem', borderRadius: '5px', marginBottom: '0.5rem' }} className="button-group--wrapper">
      <span style={{ width: '2rem', display: 'flex', justifyContent: 'center', background: 'white', height: '2rem', alignItems: 'center', borderRadius: '50px' }}>
        {icon}
      </span>
      <Spacer x size='small' />
      <div className='button-group--wrapper' style={{ height: '75%' }}>
        <div>
          <p className='button-group--label'>{label}</p>
          <p style={{ fontSize: '12px', color: 'GrayText', fontWeight: 300 }}>{subLabel}</p>
        </div>
        <Spacer x size={SpacerSize.LARGE} />
        <div className="button-group" style={{ background: 'lightgrey', height: '100%', padding: '0.1rem', borderRadius: '5px' }}>
          {options.map((option) => (
            <Button
              style={{ background: selected === option ? 'white' : '', padding: '1rem', borderRadius: '5px', minWidth: '3rem' }}
              className="option-language--button"
              color={selected === option ? COLORS.GOLD : ''}
              onClick={() => setSelected(option)}
              light
              label={NAME_MATCHING_LIST[option] || option}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export interface OptionModalProps extends EngineProps {
  shouldDisplayOption: boolean;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>;
};

function OptionModal({ fontSize, setFontSize, language, setLanguage, mode, setMode, countDown,
  setCountDown, wordCount, setWordCount, layout, setLayout, isUserAllowToType, isRunning, shouldDisplayOption, setShouldDisplayOption }: OptionModalProps) {

  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);
  return (
    <Modal
      isOpen={shouldDisplayOption}
      setIsOpen={setShouldDisplayOption}
      closeable
      darkCross
    >
      <Modal.Header>
        <p style={{ textAlign: 'center', padding: '0.5rem 1.5rem' }}>SESSION SETTINGS</p>
      </Modal.Header>
      <Modal.Body>
        <div className={`options--wrapper ${shouldDisplayOption ? '' : 'hidden'}`}>
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
          {/* <span className="separator">|</span> */}
          <OptionGroup icon={<Category set="light" />} label='layout' subLabel='Choose the way words will be displayed' options={[WordsCollectionLayout.VERTICAL, WordsCollectionLayout.HORIZONTAL]} selected={layout} setSelected={setLayout} />
          <OptionGroup icon={<IoLanguageOutline />} label='language' subLabel='Choose a language' options={[Languages.FR, Languages.EN, Languages.ES, Languages.DE]} selected={language} setSelected={setLanguage} />
          <OptionGroup icon={<MdOutlineTypeSpecimen />} label='words type' subLabel='Choose for quote, custom or random words' options={['random', 'quote', 'custom']} selected={wordsType} setSelected={setWordsType} />
          <OptionGroup icon={<RiFontSize />} label='font size' subLabel='Font size in pixel' options={[FontSize.SMALL, FontSize.MEDIUM, FontSize.LARGE, FontSize.X_LARGE]} selected={fontSize} setSelected={setFontSize} />
        </div>
        <div className="options--wrapper main-options--wrapper">
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
          <OptionGroup icon={<Game set='light' />} subLabel='Choose a session mode' label='mode' options={[TrainingMode.SPEED_CHALLENGE, TrainingMode.TIME_TRIAL]} selected={mode} setSelected={setMode} />
          {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
          {mode === TrainingMode.TIME_TRIAL && <OptionGroup icon={<TimeCircle set="light" />} label='timer' subLabel='Duration of the session in seconds' options={[15, 30, 60, 75, 90, 120]} selected={countDown} setSelected={setCountDown} />}
          {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
          {mode === TrainingMode.SPEED_CHALLENGE && <OptionGroup icon={<TbSortAscendingNumbers />} subLabel='Number of words you want to type' label='word count' options={[25, 50, 75, 100, 125, 150]} selected={wordCount} setSelected={setWordCount} />}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export { OptionModal }
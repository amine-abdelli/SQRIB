import React, { useState } from 'react'
import { EngineProps } from '../../Engine'
import Modal from '../../../../components/Modal/Modal.component';
import { TWordsType, TrainingMode, WordsCollectionLayout, WordsType } from '../../../../components/Options/Options.props';
import { FontSize } from '../../../../utils';
import { Button } from '../../../../components/Button/Button.component';
import { Languages } from '@sqrib/shared';
import './SettingsModal.style.scss';
import { Category, Game, TimeCircle } from 'react-iconly';
import { Logo, Spacer, SpacerSize } from '../../../../components';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdOutlineTypeSpecimen, MdOutlineSubject } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { PiFlowerLotusLight } from 'react-icons/pi';
import { TbSortAscendingNumbers } from 'react-icons/tb';
import { FaGripLines } from 'react-icons/fa';
import { CheckboxWithLabel } from './SubComponents/CheckboxWithLabel/CheckboxWithLabel.component';
import { ModeOptionGroup, OptionGroup } from './SubComponents/OptionGroup';

function ModeOptions({ mode, setMode, countDown, setCountDown, wordCount, setWordCount, isZenModeOn, setIsZenModeOn }: SettingsModalProps) {
  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);

  const modeOptions = [{ value: TrainingMode.TIME_TRIAL, label: 'Time Trial', subLabel: 'Race against the clock and type as many words as possible in your chosen timeframe.' }, { value: TrainingMode.SPEED_CHALLENGE, label: 'Speed Challenge', subLabel: 'Type as many words as possible in your chosen timeframe.' }];
  const wordCountOptions = [{ value: 25, label: 25 }, { value: 50, label: 50 }, { value: 75, label: 75 }, { value: 100, label: 100 }, { value: 125, label: 125 }, { value: 150, label: 150 }];
  const durationOptions = [{ value: 15, label: 15 }, { value: 30, label: 30 }, { value: 60, label: 60 }, { value: 75, label: 75 }, { value: 90, label: 90 }, { value: 120, label: 120 }];
  const wordTypeOptions = [{ value: 'random', label: 'random' }, { value: 'quote', label: 'quote' }, { value: 'custom', label: 'custom' }];

  return (
    <div style={{ background: '#f5f5f5', borderRadius: '5px', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column' }} className="button-group--wrapper">
      <ModeOptionGroup
        icon={<Game set='light' size={24} />}
        label='mode'
        options={modeOptions}
        selected={mode}
        setSelected={setMode}
      />
      {/* TODO Should become HARD MODE*/}
      <CheckboxWithLabel
        icon={<PiFlowerLotusLight />}
        label='Zen Mode'
        subLabel="With this mode, you can hop to the next word without needing to fix it. A stress-free mode for those who prefer not to be interrupted in their typing flow."
        checked={isZenModeOn}
        onChange={() => setIsZenModeOn(!isZenModeOn)}
      />
      <Spacer y size={SpacerSize.SMALL} />
      {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
      {mode === TrainingMode.TIME_TRIAL &&
        <OptionGroup
          icon={<TimeCircle set="light" />}
          label='Timer'
          subLabel='Duration of the session in seconds'
          options={durationOptions}
          selected={countDown}
          setSelected={setCountDown}
        />}
      {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
      {mode === TrainingMode.SPEED_CHALLENGE &&
        <OptionGroup
          icon={<TbSortAscendingNumbers />}
          subLabel='Number of words you want to type' label='Word Count' options={wordCountOptions}
          selected={wordCount}
          setSelected={setWordCount}
        />}
      <OptionGroup
        icon={<MdOutlineTypeSpecimen />}
        label='Words Type'
        subLabel='Choose for quote, custom or random words'
        options={wordTypeOptions}
        selected={wordsType} setSelected={setWordsType}
      />
    </div>
  )
}

export interface SettingsModalProps extends EngineProps {
  shouldDisplayOption: boolean;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};

function SettingsModal(props: SettingsModalProps) {
  const { fontSize, setFontSize, language, setLanguage, layout, setLayout, isUserAllowToType, isRunning, shouldDisplayOption, setShouldDisplayOption, resetTrainingAndRefetch, closeModal } = props;
  const layoutOptions = [{ value: WordsCollectionLayout.VERTICAL, label: <MdOutlineSubject size={22} /> }, { value: WordsCollectionLayout.HORIZONTAL, label: <FaGripLines size={18} /> }];
  const languageOptions = [{ value: Languages.FR, label: Languages.FRENCH }, { value: Languages.EN, label: Languages.ENGLISH }, { value: Languages.ES, label: Languages.SPANISH }, { value: Languages.DE, label: Languages.GERMAN }];
  const fontSizeOptions = [{ value: FontSize.SMALL, label: FontSize.SMALL }, { value: FontSize.MEDIUM, label: FontSize.MEDIUM }, { value: FontSize.LARGE, label: FontSize.LARGE }, { value: FontSize.X_LARGE, label: FontSize.X_LARGE }];
  const onSave = () => {
    setShouldDisplayOption(false);
    closeModal();
    resetTrainingAndRefetch();
  }
  return (
    <Modal
      isOpen={shouldDisplayOption}
      setIsOpen={setShouldDisplayOption}
      closeable
    >
      <Modal.Header>
        <Logo centered label='TRAINING SETTINGS' />
      </Modal.Header>
      <Modal.Body>
        <div className="options--wrapper main-options--wrapper">
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          <ModeOptions {...props} />
        </div>
        <div className={`options--wrapper ${shouldDisplayOption ? '' : 'hidden'}`}>
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
          {/* <span className="separator">|</span> */}
          <OptionGroup
            icon={<Category set="light" />}
            label='Layout'
            subLabel='Display words horizontally or vertically'
            options={layoutOptions}
            selected={layout}
            setSelected={setLayout}
          />
          <OptionGroup
            icon={<IoLanguageOutline />}
            label='Language'
            subLabel='Choose a language'
            options={languageOptions}
            selected={language}
            setSelected={setLanguage}
            select
          />
          <OptionGroup
            icon={<RiFontSize />}
            label='Font Size'
            subLabel='Font size in pixel'
            options={fontSizeOptions}
            selected={fontSize}
            setSelected={setFontSize}
          />
          <Button label="Play" onClick={onSave} style={{ padding: '1rem' }} />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export { SettingsModal }
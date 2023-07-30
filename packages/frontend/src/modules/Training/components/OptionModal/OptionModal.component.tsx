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
import { Logo, Spacer, SpacerSize } from '../../../../components';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdOutlineTypeSpecimen, MdOutlineSubject } from 'react-icons/md';
import { RiFontSize } from 'react-icons/ri';
import { TbSortAscendingNumbers } from 'react-icons/tb';
import { FaGripLines } from 'react-icons/fa';
import Select from '../../../../components/Select/Select.component';

type OptionItem = {
  // Can be a string, a number, jsx or anything else
  value: any;
  label: any;
};

interface OptionProps {
  icon?: any,
  options: Array<OptionItem>;
  selected: string | number,
  setSelected: any,
  label: string,
  subLabel?: string,
  select?: boolean
}

export function OptionIcon({ icon }: any) {
  return (
    <span style={{ width: '2rem', display: 'flex', justifyContent: 'center', background: 'white', height: '2rem', alignItems: 'center', borderRadius: '50px' }}>
      {icon}
    </span>
  )
}

function OptionGroup({
  icon, label, options, selected, setSelected, subLabel, select
}: OptionProps) {
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
          {select ? <Select data={options} onChange={setSelected} value={selected} stretch />
            : options.map(({ label, value }) => (
              <Button
                style={{ background: selected === value ? 'white' : '', padding: '0.8rem', borderRadius: '5px' }}
                className="value-language--button"
                color={selected === value ? COLORS.GOLD : ''}
                onClick={() => setSelected(value)}
                light
                label={label}
                disabled={value === WordsType.QUOTE || value === WordsType.CUSTOM || value === WordsCollectionLayout.HORIZONTAL}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function ModeOptionGroup({
  icon, label, options, selected, setSelected, subLabel
}: OptionProps) {
  return (
    <div style={{ padding: '0.5rem' }}>
      <Spacer x size='small' />
      <div style={{ height: '75%' }}>
        <div>
          <p className='button-group--label' style={{ fontSize: 42, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}<Spacer x size={SpacerSize.SMALL} />{label}</p>
          <h1 style={{ margin: '0.5rem 0' }}>Select a game mode</h1>
          <p style={{ fontSize: '12px', color: 'GrayText', fontWeight: 300 }}>{subLabel}</p>
        </div>
        <Spacer y size={SpacerSize.SMALL} />
        <div className="button-group" style={{ height: '100%', padding: '0.1rem 0', borderRadius: '5px' }}>
          {options.map(({ label, value }) => (
            <Button
              style={{ background: selected === value ? 'white' : 'lightgrey', padding: '1rem', border: `${selected === value ? 3 : 1}px solid black`, fontWeight: 800, margin: '0 0.5rem' }}
              className="option-language--button"
              color={selected === value ? COLORS.GOLD : ''}
              onClick={() => setSelected(value)}
              light
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function ModeOptions({ mode, setMode, countDown, setCountDown, wordCount, setWordCount }: OptionModalProps) {
  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);

  const modeOptions = [{ value: TrainingMode.TIME_TRIAL, label: 'time trial' }, { value: TrainingMode.SPEED_CHALLENGE, label: 'speed challenge' }];
  const wordCountOptions = [{ value: 25, label: 25 }, { value: 50, label: 50 }, { value: 75, label: 75 }, { value: 100, label: 100 }, { value: 125, label: 125 }, { value: 150, label: 150 }];
  const durationOptions = [{ value: 15, label: 15 }, { value: 30, label: 30 }, { value: 60, label: 60 }, { value: 75, label: 75 }, { value: 90, label: 90 }, { value: 120, label: 120 }];
  const wordTypeOptions = [{ value: 'random', label: 'random' }, { value: 'quote', label: 'quote' }, { value: 'custom', label: 'custom' }];

  return (
    <div style={{ background: '#f5f5f5', borderRadius: '5px', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column' }} className="button-group--wrapper">
      <ModeOptionGroup
        icon={<Game set='light' size={32} />}
        subLabel={mode === TrainingMode.TIME_TRIAL ?
          'In Time Trial mode, race against the clock and type as many words as possible in your chosen timeframe.'
          : 'In Speed Challenge mode, test your typing speed by quickly completing a set number of words you choose.'}
        label='mode'
        options={modeOptions}
        selected={mode}
        setSelected={setMode}
      />
      <Spacer y size={SpacerSize.SMALL} />
      {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
      {mode === TrainingMode.TIME_TRIAL &&
        <OptionGroup
          icon={<TimeCircle set="light" />}
          label='timer'
          subLabel='Duration of the session in seconds'
          options={durationOptions}
          selected={countDown}
          setSelected={setCountDown}
        />}
      {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
      {mode === TrainingMode.SPEED_CHALLENGE &&
        <OptionGroup
          icon={<TbSortAscendingNumbers />}
          subLabel='Number of words you want to type' label='word count' options={wordCountOptions}
          selected={wordCount}
          setSelected={setWordCount}
        />}
      <OptionGroup
        icon={<MdOutlineTypeSpecimen />}
        label='words type'
        subLabel='Choose for quote, custom or random words'
        options={wordTypeOptions}
        selected={wordsType} setSelected={setWordsType}
      />
    </div>
  )
}

export interface OptionModalProps extends EngineProps {
  shouldDisplayOption: boolean;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>;
};

function OptionModal(props: OptionModalProps) {
  const { fontSize, setFontSize, language, setLanguage, layout, setLayout, isUserAllowToType, isRunning, shouldDisplayOption, setShouldDisplayOption } = props;
  const layoutOptions = [{ value: WordsCollectionLayout.VERTICAL, label: <MdOutlineSubject size={22} /> }, { value: WordsCollectionLayout.HORIZONTAL, label: <FaGripLines size={18} /> }];
  const languageOptions = [{ value: Languages.FR, label: Languages.FRENCH }, { value: Languages.EN, label: Languages.ENGLISH }, { value: Languages.ES, label: Languages.SPANISH }, { value: Languages.DE, label: Languages.GERMAN }];
  const fontSizeOptions = [{ value: FontSize.SMALL, label: FontSize.SMALL }, { value: FontSize.MEDIUM, label: FontSize.MEDIUM }, { value: FontSize.LARGE, label: FontSize.LARGE }, { value: FontSize.X_LARGE, label: FontSize.X_LARGE }];

  return (
    <Modal
      isOpen={shouldDisplayOption}
      setIsOpen={setShouldDisplayOption}
      closeable
      darkCross
    >
      <Modal.Header>
        <Logo label='SESSION SETTINGS' />
      </Modal.Header>
      <Modal.Body>
        <div className="options--wrapper main-options--wrapper">
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          {/* <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} /> */}
          <ModeOptions {...props} />
        </div>
        <Spacer y size={SpacerSize.SMALL} />
        <div className={`options--wrapper ${shouldDisplayOption ? '' : 'hidden'}`}>
          <Spacer y size={SpacerSize.SMALL} />
          {/* Unallow user to change options while a session is running. Force him to stop the game first */}
          <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
          {/* <span className="separator">|</span> */}
          <OptionGroup
            icon={<Category set="light" />}
            label='layout'
            subLabel='Display words horizontally or vertically'
            options={layoutOptions}
            selected={layout}
            setSelected={setLayout}
          />
          <OptionGroup
            icon={<IoLanguageOutline />}
            label='language'
            subLabel='Choose a language'
            options={languageOptions}
            selected={language}
            setSelected={setLanguage}
            select
          />
          <OptionGroup
            icon={<RiFontSize />}
            label='font size'
            subLabel='Font size in pixel'
            options={fontSizeOptions}
            selected={fontSize}
            setSelected={setFontSize}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export { OptionModal }
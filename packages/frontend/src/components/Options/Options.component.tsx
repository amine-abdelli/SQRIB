import { Languages } from '@sqrib/shared';
import React, { CSSProperties, useState } from 'react';
import { Setting } from 'react-iconly';
import { Button } from '../Button/Button.component';
import { COLORS } from '../../theme/colors';
import { EngineProps } from '../../modules/Training/Engine';
import './Options.style.scss';
import {
  TWordsType, TrainingMode, WordsCollectionLayout, WordsType,
} from './Options.props';
import { FontSize } from '../../utils/fontsize.enum';

interface OptionProps {
  options: (string | number)[];
  selected: string | number;
  setSelected: any;
  label: string;
}

function OptionGroup({
  label, options, selected, setSelected,
}: OptionProps) {
  const NAME_MATCHING_LIST: Record<string, string> = {
    [TrainingMode.SPEED_CHALLENGE]: 'speed challenge',
    [TrainingMode.TIME_TRIAL]: 'time trial',
    [FontSize.SMALL]: label === 'font size' ? 'small' : '',
    [FontSize.MEDIUM]: label === 'font size' ? 'medium' : '',
    [FontSize.LARGE]: label === 'font size' ? 'large' : '',
    [FontSize.X_LARGE]: label === 'font size' ? 'extra-large' : '',
  };

  return (
    <div className="button-group--wrapper">
      <p className='button-group--label'>{label}</p>
      <div className="button-group">
        {options.map((option) => (
          <Button
            className="option-language--button"
            color={selected === option ? COLORS.GOLD : ''}
            onClick={() => setSelected(option)}
            light
            label={NAME_MATCHING_LIST[option] || option}
          />
        ))}
      </div>
    </div>
  );
}

function Options({
  fontSize, setFontSize, language, setLanguage, mode, setMode, countDown,
  setCountDown, wordCount, setWordCount, layout, setLayout, isUserAllowToType, isRunning
}: EngineProps) {
  // Words collection layout
  const [shouldDisplayOption, setShouldDisplayOption] = useState<boolean>(false);
  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);

  return (
    <>
      <div className={`options--wrapper ${shouldDisplayOption ? '' : 'hidden'}`}>
        {/* Unallow user to change options while a session is running. Force him to stop the game first */}
        <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
        <span className="separator">|</span>
        <OptionGroup label='layout' options={[WordsCollectionLayout.VERTICAL, WordsCollectionLayout.HORIZONTAL]} selected={layout} setSelected={setLayout} />
        <span className="separator">|</span>
        <OptionGroup label='language' options={[Languages.FR, Languages.EN, Languages.ES, Languages.DE]} selected={language} setSelected={setLanguage} />
        <span className="separator">|</span>
        <OptionGroup label='words type' options={['random', 'quote', 'custom']} selected={wordsType} setSelected={setWordsType} />
        <span className="separator">|</span>
        <OptionGroup label='font size' options={[FontSize.SMALL, FontSize.MEDIUM, FontSize.LARGE, FontSize.X_LARGE]} selected={fontSize} setSelected={setFontSize} />
        <span className="separator">|</span>
        <Button className={`option-cta ${shouldDisplayOption ? '' : 'hidden'}`} onClick={() => setShouldDisplayOption(!shouldDisplayOption)} label="&#10006;" light stretch />
      </div>
      <div className="options--wrapper main-options--wrapper">
        {/* Unallow user to change options while a session is running. Force him to stop the game first */}
        <div className={isUserAllowToType && isRunning ? 'disabled-options' : ''} />
        <OptionGroup label='mode' options={[TrainingMode.SPEED_CHALLENGE, TrainingMode.TIME_TRIAL]} selected={mode} setSelected={setMode} />
        {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
        {mode === TrainingMode.TIME_TRIAL && <OptionGroup label='timer' options={[15, 30, 60, 75, 90, 120]} selected={countDown} setSelected={setCountDown} />}
        {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
        {mode === TrainingMode.SPEED_CHALLENGE && <OptionGroup label='word count' options={[25, 50, 75, 100, 125, 150]} selected={wordCount} setSelected={setWordCount} />}
        <Button className={`option-cta ${shouldDisplayOption ? 'hidden' : ''}`} onClick={() => setShouldDisplayOption(!shouldDisplayOption)} label={<Setting set="curved" primaryColor="black" />} light stretch />
      </div>
    </>
  );
}

export { Options };

import { Languages } from '@sqrib/shared';
import React, { useState } from 'react';
import { Button } from '../Button/Button.component';
import { COLORS } from '../../theme/colors';
import { EngineProps } from '../Engine';
import './Options.style.scss';
import {
  Difficulty, TDifficulty, TWordsCollectionLayout,
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
  const NAME_MATCHING_LIST: Record<TrainingMode | FontSize, string> = {
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
  fontSize,
  setFontSize,
  language,
  setLanguage,
  mode, setMode, countDown,
  setCountDown, wordCount, setWordCount,
}: EngineProps) {
  // Words collection layout
  const [layout, setLayout] = useState<TWordsCollectionLayout>(WordsCollectionLayout.HORIZONTAL);
  const [difficulty, setDifficulty] = useState<TDifficulty>(Difficulty.EASY);
  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);

  return (
    <>
      <div className="options--wrapper">
        <OptionGroup label='layout' options={[WordsCollectionLayout.VERTICAL, WordsCollectionLayout.HORIZONTAL]} selected={layout} setSelected={setLayout} />
        <span className="separator">|</span>
        <OptionGroup label='language' options={[Languages.FR, Languages.EN, Languages.ES, Languages.DE]} selected={language} setSelected={setLanguage} />
        <span className="separator">|</span>
        <OptionGroup label='difficulty' options={[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]} selected={difficulty} setSelected={setDifficulty} />
        <span className="separator">|</span>
        <OptionGroup label='words type' options={['random', 'quote', 'custom']} selected={wordsType} setSelected={setWordsType} />
        <span className="separator">|</span>
        <OptionGroup label='font size' options={[FontSize.SMALL, FontSize.MEDIUM, FontSize.LARGE, FontSize.X_LARGE]} selected={fontSize} setSelected={setFontSize} />
        <span className="separator">|</span>
      </div>
      <div className="options--wrapper main-options--wrapper">
        <OptionGroup label='mode' options={[TrainingMode.SPEED_CHALLENGE, TrainingMode.TIME_TRIAL]} selected={mode} setSelected={setMode} />
        {/* You have 15, 30, 45, 60, 75 or 90seconds to type as many words as possible  */}
        {mode === TrainingMode.TIME_TRIAL && <OptionGroup label='timer' options={[15, 30, 45, 60, 75, 90]} selected={countDown} setSelected={setCountDown} />}
        {/* You have 25, 50, 75, 100, 125 or 150 words to type as fast as possible  */}
        {mode === TrainingMode.SPEED_CHALLENGE && <OptionGroup label='word count' options={[25, 50, 75, 100, 125, 150]} selected={wordCount} setSelected={setWordCount} />}
      </div>
    </>
  );
}

export { Options };

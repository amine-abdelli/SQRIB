import { FontSize, Languages } from '@sqrib/shared';
import React, { useState } from 'react';
import { VolumeDown, VolumeOff } from 'react-iconly';
// import { BiInfinite } from 'react-icons/bi';
import { Button } from '../Button/Button.component';
import { COLORS } from '../../theme/colors';
import { EngineProps } from '../Engine';
import './Options.style.scss';
import {
  Difficulty, TDifficulty, TTrainingMode, TWordsCollectionLayout,
  TWordsType, TrainingMode, WordsCollectionLayout, WordsType,
} from './Options.props';

interface OptionProps {
  options: (string | number)[];
  selected: string | number;
  setSelected: any;
  label: string;
}

const obj: Record<TrainingMode, string> = {
  [TrainingMode.SPEED_CHALLENGE]: 'speed challenge',
  [TrainingMode.TIME_TRIAL]: 'time trial',
};

function OptionGroup({
  label, options, selected, setSelected,
}: OptionProps) {
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
              label={obj[option] || option}
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
}: EngineProps) {
  const [sound, setSound] = useState<boolean>(false);
  // Words collection layout
  const [layout, setLayout] = useState<TWordsCollectionLayout>(WordsCollectionLayout.HORIZONTAL);
  const [difficulty, setDifficulty] = useState<TDifficulty>(Difficulty.EASY);
  const [wordsType, setWordsType] = useState<TWordsType>(WordsType.RANDOM);
  const [mode, setMode] = useState<TTrainingMode>(TrainingMode.SPEED_CHALLENGE);
  console.log('difficulty', difficulty);
  console.log('wordsType', wordsType);
  console.log('mode', mode);
  console.log('layout', layout);
  console.log('language', language);

  return (
    <div className="options--wrapper">
      <OptionGroup label='layout' options={[WordsCollectionLayout.VERTICAL, WordsCollectionLayout.HORIZONTAL]} selected={layout} setSelected={setLayout} />
      <span className="separator">|</span>
      <OptionGroup label='language' options={[Languages.FR, Languages.EN, Languages.ES, Languages.DE]} selected={language} setSelected={setLanguage} />
      <span className="separator">|</span>
      <OptionGroup label='difficulty' options={[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]} selected={difficulty} setSelected={setDifficulty} />
      <span className="separator">|</span>
      <OptionGroup label='words type' options={['random', 'quote', 'custom']} selected={wordsType} setSelected={setWordsType} />
      <span className="separator">|</span>
      <OptionGroup label='mode' options={[TrainingMode.SPEED_CHALLENGE, TrainingMode.TIME_TRIAL]} selected={mode} setSelected={setMode} />
      <span className="separator">|</span>
      <OptionGroup label='font size' options={[FontSize.SMALL, FontSize.MEDIUM, FontSize.LARGE, FontSize.X_LARGE]} selected={fontSize} setSelected={setFontSize} />
    </div>
  );
}

export { Options };

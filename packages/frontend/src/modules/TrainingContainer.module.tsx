import React from 'react';
import {
  EngineProps, Spacer, SpacerSize, WordsCollection,
} from '../components';
import { TypingInput } from '../components/TypingInput';
import { Options } from '../components/Options/Options.component';
import '../theme/components/_containers.scss';
import { WordsCollectionHeader } from '../components/DisplayerHeader/DisplayerHeader.component';
import { Scoring } from '../components/Scoring/Scoring.component';
import { ResetButton } from '../components/ResetButton/ResetButton.component';
import { WordsCollectionLayout } from '../components/Options/Options.props';

function TrainingModule(props: EngineProps) {
  return (
    <section className='training-container--wrapper'>
      <Options {...props}/>
      <Scoring {...props} />
      <Spacer size={SpacerSize.LARGE} y />
      <WordsCollectionHeader {...props} />
      <div style={{ position: 'relative' }}>
        <ResetButton onClick={props.resetTraining} />
        <TypingInput {...props} />
      </div>
      <Spacer size={SpacerSize.MEDIUM} y />
      {props.layout === WordsCollectionLayout.HORIZONTAL
        ? <WordsCollection {...props } /> : <WordsCollection {...props} />}
    </section>
  );
}

export { TrainingModule };

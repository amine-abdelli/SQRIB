import React from 'react';
import { EngineProps, Spacer, SpacerSize } from '../components';
import { WordsCollection } from '../components/WordsCollection/WordsCollection.component';
import { TypingInput } from '../components/TypingInput';
import { Options } from '../components/Options/Options.component';
import '../theme/components/_containers.scss';
import { WordsCollectionHeader } from '../components/DisplayerHeader/DisplayerHeader.component';
import { Scoring } from '../components/Scoring/Scoring.component';
import { ResetButton } from '../components/ResetButton/ResetButton.component';

function TrainingModule(props: EngineProps) {
  return (
    <section className='training-container--wrapper'>
      <Options {...props}/>
      <Scoring {...props} />
      <Spacer size={SpacerSize.LARGE} y />
      <WordsCollectionHeader {...props} />
      <div style={{ position: 'relative' }}>
        <ResetButton onClick={props.setShouldReset} />
        <TypingInput {...props} />
      </div>
      <Spacer size={SpacerSize.MEDIUM} y />
      <WordsCollection {...props} />
    </section>
  );
}

export { TrainingModule };

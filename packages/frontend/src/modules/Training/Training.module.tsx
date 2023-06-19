import React from 'react';
import {
  EngineProps, Spacer, SpacerSize, WordsCollection,
} from '../../components';
import { TypingInput } from '../../components/TypingInput';
import { Options } from '../../components/Options/Options.component';
import { WordsCollectionHeader } from '../../components/DisplayerHeader/DisplayerHeader.component';
import { Scoring } from '../../components/Scoring/Scoring.component';
import { WordsCollectionLayout } from '../../components/Options/Options.props';
import { Button } from '../../components/Button/Button.component';
import KeyBoard from '../../components/KeyBoard/KeyBoard.component';
import '../../theme/components/_containers.scss';
import { TrainingModal } from './components/TrainingModal/TrainingModal.component';
import { OptionModal } from './components/OptionModal/OptionModal.component';

function TrainingModule(props: EngineProps) {
  const [shouldDisplayOption, setShouldDisplayOption] = React.useState<boolean>(false);
  const optionProps = { ...props, shouldDisplayOption, setShouldDisplayOption }
  return (
    <section className='training-container--wrapper'>
      <Scoring {...optionProps} />
      <Spacer size={SpacerSize.SMALL} y />
      <WordsCollectionHeader {...props} />
      <div style={{ position: 'relative' }}>
        {!props.isRunning && <Button style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }} onClick={() => props.resetTraining()} label="Replay" stretch />}
        {!props.isRunning && <Button style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={() => props.resetTrainingAndRefetch()} label="New game" stretch />}
        {props.isRunning && <Button style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, background: 'red' }} onClick={() => props.resetTraining()} label="STOP" stretch />}
        <TypingInput {...props} />
      </div>
      {props.layout === WordsCollectionLayout.HORIZONTAL
        ? <WordsCollection {...props} /> : <WordsCollection {...props} />}
      <KeyBoard enable />
      <TrainingModal {...props} />
      <OptionModal {...optionProps} />
    </section>
  );
}

export { TrainingModule };

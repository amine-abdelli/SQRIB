import React from 'react';
import {
  EngineProps, Spacer, SpacerSize, WordsCollection,
} from '../../components';
import { TypingInput } from '../../components/TypingInput';
import { WordsCollectionHeader } from '../../components/DisplayerHeader/DisplayerHeader.component';
import { Scoring } from '../../components/Scoring/Scoring.component';
import { WordsCollectionLayout } from '../../components/Options/Options.props';
import { Button } from '../../components/Button/Button.component';
import { KeyBoard } from '../../components/KeyBoard/KeyBoard.component';
import { SettingsModal } from './components/SettingsModal/SettingsModal.component';
import { ReplayModal } from './components/ReplayModal/ReplayModal.component';
import { FaPlay, FaStop } from 'react-icons/fa';
import { COLORS } from '../../theme/colors';
import { ScoreBoardModal } from './components/ScoreBoardModal/ScoreBoardModal.component';
import { useIsInputFocused } from '../../hooks/useIsInputFocused.hook';
import '../../theme/pages/_Training.scss';

function TrainingModule(props: EngineProps) {
  const [shouldDisplayOption, setShouldDisplayOption] = React.useState<boolean>(true);
  const [shouldDisplayReplayModal, setShouldDisplayReplayModal] = React.useState<boolean>(false);
  const [isFocused, inputRef] = useIsInputFocused();

  const closeModal = React.useCallback(() => setShouldDisplayReplayModal(false), [setShouldDisplayReplayModal]);
  const openModal = React.useCallback(() => setShouldDisplayReplayModal(true), [setShouldDisplayReplayModal]);
  const { isUserAllowToType, misspellings } = props;
  const optionProps = { ...props, shouldDisplayOption, setShouldDisplayOption, closeModal }
  const replayProps = { ...props, shouldDisplayReplayModal, setShouldDisplayReplayModal, setShouldDisplayOption, closeModal }
  const inputProps = { ...props, inputRef }
  return (
    <section className='training-page--wrapper'>
      <Scoring {...optionProps} />
      <Spacer size={SpacerSize.SMALL} y />
      <WordsCollectionHeader {...props} />
      <div style={{ position: 'relative' }}>
        {props.isRunning ? <Button
          style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, background: COLORS.ERROR }}
          onClick={() => props.resetTraining()}
          label={<FaStop />}
          stretch
        /> : <Button
          style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}
          onClick={openModal}
          label={<FaPlay />}
          stretch
        />}
        <TypingInput {...inputProps} />
      </div>
      {props.layout === WordsCollectionLayout.HORIZONTAL
        ? <WordsCollection {...props} /> : <WordsCollection {...props} />}
      <Spacer y size={SpacerSize.MEDIUM} />
      <div className='keyboard--layout'>
        <KeyBoard enable={isUserAllowToType} misspellings={misspellings} isFocused={isFocused} />
      </div>
      <ScoreBoardModal {...replayProps} />
      <SettingsModal {...optionProps} />
      <ReplayModal {...replayProps} />
    </section>
  );
}

export { TrainingModule };

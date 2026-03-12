import React from 'react';
import { SessionMode } from '@sqrib/shared';

import { PlayerCardList } from '../../../components/PlayerCardList/PlayerCardList.component';
import { TypingInput } from '../../../../../components/TypingInput';
import { ClassicEngineProps } from '../ClassicEngine/ClassicEngine.props';
import { EngineProps, Spacer, SpacerSize, WordsCollection } from '../../../../../components';
import { Text } from '../../../../../components/Text/Text.component';
import { CountdownOverlay } from '../../../components/CountdownOverlay/CountdownOverlay.component';
import { GameResults } from '../../../components/GameResults/GameResults.component';
import { usePlayer } from '../../../../../contexts/PlayerContext';
import { COLORS } from '../../../../../theme/colors';
import './ClassicMode.style.scss';

const ClassicMode = (props: ClassicEngineProps) => {
  const {
    players, sessionProperties, timer, countdown, totalWords,
    gameEnded, rankings, ...propsRest
  } = props;

  const { username } = usePlayer();
  const options = sessionProperties?.options;
  const isTimeTrial = options?.mode === SessionMode.TIME_TRIAL;
  const timeLimit = options?.time ?? 0;

  const displayTimer = isTimeTrial
    ? Math.max(0, timeLimit - timer)
    : timer;

  const timerLabel = isTimeTrial
    ? `${displayTimer}s`
    : `${displayTimer}s`;

  if (gameEnded) {
    return <GameResults rankings={rankings} totalWords={totalWords} timer={timer} />;
  }

  return (
    <section className='classic-mode'>
      {countdown !== null && <CountdownOverlay count={countdown} />}

      <div className='classic-mode__header'>
        <div className='classic-mode__meta'>
          <span className='classic-mode__badge'>
            {isTimeTrial ? 'Time Trial' : 'Speed Challenge'}
          </span>
          {options?.language && (
            <span className='classic-mode__badge classic-mode__badge--secondary'>
              {options.language.toUpperCase()}
            </span>
          )}
          {options?.name && (
            <Text fira style={{ color: COLORS.GREY, fontSize: '13px' }}>{options.name}</Text>
          )}
        </div>
        <div className='classic-mode__timer'>
          <span className='classic-mode__timer-label'>
            {isTimeTrial ? 'Time left' : 'Elapsed'}
          </span>
          <span className='classic-mode__timer-value'>{timerLabel}</span>
        </div>
      </div>

      <Spacer y size={SpacerSize.SMALL} />

      <div className='classic-mode__body'>
        <div className='classic-mode__typing-area'>
          <WordsCollection {...propsRest as EngineProps} horizontal />
          <Spacer y size={SpacerSize.SMALL} />
          <TypingInput {...propsRest as EngineProps} />
        </div>

        <Spacer x size={SpacerSize.LARGE} />

        <div className='classic-mode__players'>
          <Text fira bold style={{ marginBottom: '0.6rem', color: COLORS.DARK_GREEN }}>Players</Text>
          <PlayerCardList
            players={players}
            totalWords={totalWords}
            currentUsername={username}
          />
        </div>
      </div>
    </section>
  );
};

export { ClassicMode };

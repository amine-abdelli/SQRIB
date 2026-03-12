import React from 'react';
import { GameMode } from '../../utils/enums/Mode.enum';
import ModeSelect from './DifficultySelect';
import styles from './Modal.module.scss';

function ModeSelection({ theme, onGameModeSelection }: any) {
  return (
    <>
      <h1 className={styles.modeTitle}>Selectionnez un mode de jeu</h1>
      <div className={styles.modeWrapper}>
        <ModeSelect
          title="Mode 1"
          mode={GameMode.COUNTDOWN}
          theme={theme}
          onGameModeSelection={onGameModeSelection}
        />
        <ModeSelect
          title="Mode 2"
          mode={GameMode.COUNTUP}
          theme={theme}
          onGameModeSelection={onGameModeSelection}
        />
      </div>
    </>
  );
}

export default ModeSelection;

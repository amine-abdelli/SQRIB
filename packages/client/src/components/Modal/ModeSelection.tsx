import React from 'react';
import { GameMode } from '../../helpers/enums/Mode.enum';
import DifficultySelect from './DifficultySelect';
import styles from './Modal.module.scss';

function ModeSelection({ theme, onGameModeSelection, setDifficulty }: any) {
  const props = {
    theme,
    setDifficulty,
    onGameModeSelection,
  };

  return (
    <>
      <h1 className={styles.modeTitle}>Selectionnez un mode de jeu</h1>
      <div className={styles.modeWrapper}>
        <DifficultySelect title="Mode 1" mode={GameMode.ONE} {...props} />
        <DifficultySelect title="Mode 2" mode={GameMode.TWO} {...props} />
      </div>
    </>
  );
}

export default ModeSelection;

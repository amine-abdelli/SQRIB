/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Difficulty } from '../../helpers/enums/Difficulty.enum';
import Button from '../Buttons/Button';
import styles from './Modal.module.scss';

const DifficultySelect = function ({
  theme, setDifficulty, onGameModeSelection, title, mode: gameMode,
}: any) {
  const [shouldExtendModeButton, setShouldExtendModeButton] = useState<boolean>(false);
  function onLevelSelect(level: Difficulty, mode: any) {
    setDifficulty(level);
    onGameModeSelection(mode);
    setShouldExtendModeButton(false);
  }
  const style = {
    border: `1px solid ${theme?.secondary}`,
  };
  return (
    <Button
      style={{ ...style }}
      onClick={() => setShouldExtendModeButton(!shouldExtendModeButton)}
      className={styles.mode}
    >
      {title}
      {shouldExtendModeButton && (
      <>
        <Button
          className={styles.difficultyButton}
          onClick={() => onLevelSelect(Difficulty.EASY, gameMode)}
        >
          easy
        </Button>
        <Button
          className={styles.difficultyButton}
          onClick={() => onLevelSelect(Difficulty.MEDIUM, gameMode)}
        >
          medium
        </Button>
        <Button
          className={styles.difficultyButton}
          onClick={() => onLevelSelect(Difficulty.HARD, gameMode)}
        >
          hard
        </Button>
      </>
      )}
    </Button>
  );
};

export default DifficultySelect;

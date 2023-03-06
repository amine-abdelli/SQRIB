/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from '../Buttons/Button.component';
import styles from './Modal.module.scss';

function ModeSelect({
  theme, onGameModeSelection, title, mode: gameMode,
}: any) {
  function onLevelSelect(mode: any) {
    onGameModeSelection(mode);
  }
  const style = {
    border: `1px solid ${theme?.secondary}`,
  };
  return (
    <Button
      style={{ ...style }}
      onClick={() => onLevelSelect(gameMode)}
      className={styles.mode}
    >
      {title}
    </Button>
  );
}

export default ModeSelect;

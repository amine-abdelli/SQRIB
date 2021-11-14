import { Dialog } from '@blueprintjs/core';
import React from 'react';
import { GameMode } from '../../helpers/Mode.enum';
import styles from './Modal.module.scss';

const Modal = ({ showModeSelection, setShowModeSelection, theme, onGameModeSelection }: any) => {

  const style = {
    border: `1px solid ${theme?.secondary}`
  }

  return (
    <Dialog isOpen={showModeSelection} onClose={() => setShowModeSelection(false)}>
      <>
        <h1 className={styles.modeTitle}>Selectionnez un mode de jeu</h1>
        <div className={styles.modeWrapper}>
          <div onClick={() => onGameModeSelection(GameMode.ONE)} style={{ ...style }} className={styles.mode}>
            Mode 1
          </div>
          <div onClick={() => onGameModeSelection(GameMode.TWO)} style={{ ...style }} className={styles.mode}>Mode 2</div>
        </div>
      </>
    </Dialog>
  )
}

export default Modal

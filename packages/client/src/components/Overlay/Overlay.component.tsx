import React, { ReactElement } from 'react';
import { BsKeyboard } from 'react-icons/bs';
import styles from './Overlay.module.scss';
import RefreshButton from '../Buttons/RefreshButton/RefreshButton.component';

function Overlay({ onClick, computedWords }: any): ReactElement {
  return (
    <div
      onClick={onClick}
      className={styles.overlayWrapper}
    >
      <div className={styles.overlay}>
        {computedWords.length
          ? <RefreshButton />
          : <BsKeyboard className={styles.icon} size={40} />}
        {computedWords.length ? 'Cliquez sur refresh' : 'Commencez à taper pour lancer le chronomètre'}
      </div>
    </div>
  );
}

export default Overlay;

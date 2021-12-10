/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import styles from './Overlay.module.scss';

function Overlay({ onClick }: any): ReactElement {
  return (
    <div
      onClick={onClick}
      className={styles.overlayWrapper}
    >
      <div className={styles.overlay}>
        <FontAwesomeIcon className={styles.icon} icon={faHandPointer} />
        Cliquez pour continuer
      </div>
    </div>
  );
}

export default Overlay;

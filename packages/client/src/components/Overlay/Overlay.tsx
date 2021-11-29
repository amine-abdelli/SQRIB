/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Overlay.module.scss';

const Overlay = function ({ onClick }: { onClick: () => void }): React.ReactElement {
  return (
    <div
      className={styles.overlayWrapper}
      onClick={onClick}
    >
      <div className={styles.overlay}>
        <FontAwesomeIcon className={styles.icon} icon={faHandPointer} />
        Cliquez pour continuer
      </div>
    </div>
  );
};

export default Overlay;

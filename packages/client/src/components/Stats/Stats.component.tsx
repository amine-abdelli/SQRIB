import React from 'react';
import { Colors } from '../../helpers/enums';
import { IStats } from './Stats.props';
import styles from './Stats.module.scss';

function Stats({
  wrongWords,
  wordCount,
  correctWords,
  correctLetters,
  totalLetters,
  wrongLetters,
  precision,
  points,
  mpm,
}: IStats) {
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.statsContent}>
        <h1 className={styles.mpm}>
          {`${mpm} mpm`}
        </h1>
        <p className={styles.mpmTranslation}>(mot par minutes)</p>
        <h3 style={{ color: Colors.GREEN, textAlign: 'center' }}>
          {`${points} points`}
        </h3>
        <p>
          {`Nombre de mots saisies: ${wordCount}`}
        </p>
        <p>
          {`mots incorrects: ${wrongWords}`}
        </p>
        <p>
          {`Mots corrects: ${correctWords.length}`}
        </p>
        <p>
          {`précision: ${precision}%`}
        </p>
        <p>
          {`nombre de lettre total saisies: ${totalLetters}`}
        </p>
        <p>
          {`lettres correct: ${correctLetters}`}
        </p>
        <p>
          {`lettres incorrects: ${wrongLetters}`}
        </p>
      </div>
    </div>
  );
}

export default Stats;

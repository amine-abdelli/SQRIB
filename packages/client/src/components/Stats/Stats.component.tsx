import React from 'react';
import { Colors } from '../../helpers/enums';
import { IStats } from './Stats.props';

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
    <div style={{ padding: '2rem' }}>
      <div style={{
        border: '2px orange solid', borderRadius: '10px', width: '100%', height: '100%', padding: '1rem',
      }}
      >
        <h1 style={{ margin: 0, padding: 0, textAlign: 'center' }}>
          {`${mpm} mpm`}
        </h1>
        <p style={{ textAlign: 'center' }}>(mot par minutes)</p>
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

import React from 'react';

function Stats({
  points, malus, wordCount, precision,
}: any) {
  return (
    <div style={{ padding: '2rem' }}>
      <div>
        <p>
          mots saisies:
          {points}
          {' '}
        </p>
        <p>
          mots perdus:
          {malus}
          {' '}
        </p>
        <p>
          nombre de mots:
          {wordCount}
          {' '}
        </p>
        <p>
          précision:
          {precision}
          %
          {' '}
        </p>
      </div>
    </div>
  );
}

export default Stats;

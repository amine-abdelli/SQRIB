import { Divider, Spinner } from '@blueprintjs/core';
import React from 'react';
import Calendar from '../src/components/Calendar/Calendar.component';
import Chart from '../src/components/Chart/Chart.component';
import Empty from '../src/components/Empty/Empty.component';
import ScoreCard from '../src/components/ScoreCard/ScoreCard.component';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { ITheme } from '../styles/theme';
import { createScoringObject } from '../src/utils/scoring.utils';
import Histogram from '../src/components/Histogram/Histogram';

function Profile({ theme }: { theme: ITheme }) {
  const { scores, loading } = useGetSelf();
  if (loading) return <Spinner />;

  const newScores = [...scores].sort(
    (a: any, b: any) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
  );

  const {
    averageMpm, averagePoints, topMpm, topPoint, latestMpm, latestPoints, precision, totalGame,
  } = createScoringObject(scores);

  // * Scores du jour
  // * REFACTO A DONF
  // * TYPER any
  // * Générer type API-CLIENT à réutiliser partout dans l'appli

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
    }}
    >
      <h1 style={{ textAlign: 'center' }}>STATISTIQUE</h1>
      <Divider style={{ margin: 0 }} />
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px',
      }}
      >
        <ScoreCard content={totalGame} title="Parties jouées" highlight />
        <ScoreCard content={averageMpm} title="Moyenne (mpm)" unit="mpm" />
        <ScoreCard content={latestMpm} title="Dernier (mpm)" unit="mpm" />
        <ScoreCard content={topMpm} title="Meilleur (mpm)" unit="mpm" best />
        {/* --- */}
        <ScoreCard content={precision} title="Precision" unit="%" highlight />
        <ScoreCard content={averagePoints} title="Moyenne (points)" unit="points" />
        <ScoreCard content={latestPoints} title="Dernier (points)" unit="points" />
        <ScoreCard content={topPoint} title="meilleur (points)" unit="points" best />
      </div>
      <div>
        {!scores?.length
          ? <Empty />
          : (
            <>
              <Chart
                scores={newScores}
                topMpm={topMpm}
              />
              <Histogram />
              <Calendar
                scores={newScores}
                theme={theme}
              />
            </>
          )}
      </div>
    </div>
  );
}

export default Profile;

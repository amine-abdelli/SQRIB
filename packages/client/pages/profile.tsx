import React from 'react';
import { Spinner } from '@nextui-org/react';
import Calendar from '../src/components/Calendar/Calendar.component';
import Chart from '../src/components/Chart/Chart.component';
import ScoreCard from '../src/components/ScoreCard/ScoreCard.component';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { ITheme } from '../styles/theme';
import { createTopScoringObject } from '../src/utils/scoring.utils';
import Empty from '../src/components/Empty/Empty.component';
import withAuth from '../src/components/withAuth/withAuth.hoc';

function Profile({ theme }: { theme: ITheme }) {
  const { scores, loading } = useGetSelf();
  if (loading) return <Spinner />;
  const sortedScores = [...scores].sort(
    (a: any, b: any) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
  );

  const {
    averageMpm, averagePoints, topMpm, topPoint, latestMpm, latestPoints, precision, totalGame,
  } = createTopScoringObject(sortedScores);

  // * REFACTO A DONF
  // * TYPER any
  // * Générer type API-CLIENT à réutiliser partout dans l'appli

  return (
    <div className="flex flex-column">
      <h1 className='text-center'>STATISTIQUE</h1>
      <hr style={{ borderBottom: '1px solid' }} />
      <div
        className='h100 w100 flex justify-between flex-wrap-wrap mb20'
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
                scores={sortedScores}
                topMpm={topMpm}
              />
              <Calendar
                scores={sortedScores}
                theme={theme}
              />
            </>
          )}
      </div>
    </div>
  );
}

export default withAuth(Profile);

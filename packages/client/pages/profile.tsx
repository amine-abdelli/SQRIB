import React from 'react';
import { Spinner } from '@nextui-org/react';
import { ScoreType } from '@sqrib/utils';
import Calendar from '../src/components/Calendar/Calendar.component';
import Chart from '../src/components/Chart/Chart.component';
import ScoreCard from '../src/components/ScoreCard/ScoreCard.component';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { createTopScoringObject } from '../src/utils/scoring.utils';
import Empty from '../src/components/Empty/Empty.component';
import withAuth from '../src/components/withAuth/withAuth.hoc';
import styles from '../styles/sass/pages/_profile.module.scss';
import Card from '../src/UI/Card/Card.component';
import Spacer from '../src/UI/Spacer/Spacer.component';
import { useWindowSize } from '../src/hooks/useWindowSize';

function Profile() {
  const { scores, loading } = useGetSelf();
  const { isSmallScreen } = useWindowSize();
  if (loading) return <Spinner />;
  const sortedScores = [...scores]
    .sort(
      (a: ScoreType, b: ScoreType) => Date.parse(a.created_at as string)
      - Date.parse(b.created_at as string),
    );

  const {
    averageMpm, averagePoints, topMpm, topPoint, latestMpm, latestPoints, precision, totalGame,
  } = createTopScoringObject(sortedScores);

  return (
    <Card styles={{ width: '95%', margin: '0 auto' }} shadowed>
      <h1 className={styles.statTitle}>STATISTIQUE</h1>
      <div
        className={styles.scoreCardsWrapper}
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
              />
              <Spacer h="50" />
              {!isSmallScreen && (
                <Calendar
                  scores={sortedScores}
                />
              )}
            </>
          )}
      </div>
    </Card>
  );
}

export default withAuth(Profile);

import React from 'react'
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import { ActivityTracker, PlayerDetail, UserRank, UserStats, WeeklyTracker } from './components';
import { ProgressChart } from './components/ProgressChart';
import '../../theme/pages/_Profile.scss';
import { useGetUserScores } from '../../api/queries/useGetScores.hook';
import { COLORS } from '../../theme/colors';
import { Card } from '../../components/Card/Card.component';
import { Text } from '../../components/Text/Text.component';

const ProfileModule = (props: ProfileEngineProps) => {
  const { data: userScoresData } = useGetUserScores();
  return (
    <div className="profile-container--wrapper">
      <section className='profile-container--top-section'>
        <Card style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'center', flex: 1, background: COLORS.GOLD }} shadowed>
          <Text fira bold>E</Text>
          <Text fira bold>D</Text>
          <Text fira bold>I</Text>
          <Text fira bold>T</Text>
        </Card>
        <PlayerDetail {...props} />
        <WeeklyTracker />
      </section>
      <section className='profile-container--user-stats'>
        <UserStats />
        <UserRank />
      </section>
      <section className='profile-container--progress-chart'>
        <ProgressChart data={userScoresData} averageSqribWpm={76} bestSqribWpm={112} />
      </section>
      <section className='profile-container--activity-tracker'>
        <ActivityTracker data={userScoresData} />
      </section>
    </div>
  )
}

export { ProfileModule };
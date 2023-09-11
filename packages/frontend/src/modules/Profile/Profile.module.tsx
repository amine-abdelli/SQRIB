import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import { ActivityTracker, PlayerDetail, UserRank, UserStats, WeeklyTracker } from './components';
import { ProgressChart } from './components/ProgressChart';
import '../../theme/pages/_Profile.scss';
import { useGetUserScores } from '../../api/queries/useGetScores.hook';
import { COLORS } from '../../theme/colors';
import { Text } from '../../components/Text/Text.component';
import { Button } from '../../components/Button/Button.component';
import { Spacer, SpacerSize } from '../../components';

const ProfileModule = (props: ProfileEngineProps) => {
  const { data: userScoresData } = useGetUserScores();
  return (
    <div className="profile-container--wrapper">
      <section className='profile-container--top-section'>
        <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: COLORS.GOLD, width: '3rem', margin: '0.5rem 0 0.5rem 0.5rem' }} onClick={() => null}>
          <>
            <Text fira bold>E</Text>
            <Text fira bold>D</Text>
            <Text fira bold>I</Text>
            <Text fira bold>T</Text>
            <Spacer y size={SpacerSize.SMALL} />
            <AiOutlineEdit />
          </>
        </Button>
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
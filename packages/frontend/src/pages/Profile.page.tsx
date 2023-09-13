import React from 'react';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import { BackButton, HomeButton } from '../components/HomeButton/HomeButton.component';
import '../theme/pages/_Profile.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUserScores } from '../api/queries/useGetScores.hook';
import { ActivityTracker, PlayerDetail, ProgressChart, UserRank, UserStats, WeeklyTracker } from '../modules/Profile/components';
import { AiOutlineEdit } from 'react-icons/ai';
import { Spacer, SpacerSize } from '../components';
import { Text } from '../components/Text/Text.component';
import { Button } from '../components/Button/Button.component';
import { COLORS } from '../theme/colors';

const Profile = () => {
  document.title = 'Profile';
  const location = useLocation()
  const { username } = useParams();
  const isVisitingOwnProfile = !username;
  const { data: userScoresData, refetch } = useGetUserScores({ username: username });

  React.useEffect(() => {
    refetch();
  }, [username, isVisitingOwnProfile, location])

  return (
    <main className="layout--main profile--main">
      <span style={{ position: 'absolute', left: '1.5rem', height: '3rem', width: '3rem', top: '1.5rem' }}>
        {isVisitingOwnProfile ? <HomeButton /> : <BackButton />}
      </span>
      <MovingBackground />
      <div className="profile-container--wrapper">
        <section className='profile-container--top-section'>
          {isVisitingOwnProfile && <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: COLORS.GOLD, width: '3rem', margin: '0.5rem 0 0.5rem 0.5rem' }} onClick={() => null}>
            <>
              <Text fira bold>E</Text>
              <Text fira bold>D</Text>
              <Text fira bold>I</Text>
              <Text fira bold>T</Text>
              <Spacer y size={SpacerSize.SMALL} />
              <AiOutlineEdit />
            </>
          </Button>}
          <PlayerDetail />
          <WeeklyTracker username={username} />
        </section>
        <section className='profile-container--user-stats'>
          <UserStats username={username} />
          <UserRank username={username} />
        </section>
        <section className='profile-container--progress-chart'>
          <ProgressChart scores={userScoresData} />
        </section>
        <section className='profile-container--activity-tracker'>
          <ActivityTracker data={userScoresData} />
        </section>
      </div>
    </main>
  )
}

export default Profile
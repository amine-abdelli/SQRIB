import React from 'react';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import { GoToButton, HomeButton } from '../components/HomeButton/HomeButton.component';
import { useLocation, useParams } from 'react-router-dom';
import { useGetUserScores } from '../api/queries/useGetScores.hook';
import { ActivityTracker, PlayerDetail, ProgressChart, UserRank, UserStats, WeeklyTracker } from '../modules/Profile/components';
import { EditButton } from '../modules/Profile/components/EditButton/EditButton.component';

import '../theme/pages/_Profile.scss';

const Profile = () => {
  const location = useLocation()
  const { username } = useParams();
  const isVisitingOwnProfile = !username;
  const { data: userScoresData, refetch } = useGetUserScores({ username: username });

  React.useEffect(() => {
    refetch();
  }, [username, isVisitingOwnProfile, location])

  document.title = isVisitingOwnProfile ? 'Your profile' : `${username}'s profile`;

  return (
    <main className="layout--main profile--main">
      <MovingBackground />
      <div className="profile-container--wrapper">
        <section className='profile-container--top-section'>
          <div style={{ display: 'flex', flex: 1 }}>
            <span className='home-button'>
              {isVisitingOwnProfile ? <HomeButton /> : <GoToButton />}
            </span>
            {isVisitingOwnProfile && <EditButton />}
            <PlayerDetail />
          </div>
          <WeeklyTracker username={username} />
        </section>
        <section className='profile-container--user-stats'>
          <UserStats username={username} />
          <UserRank username={username} />
        </section>
        <section className='profile-container--progress-chart'>
          <ProgressChart scores={userScoresData} username={username} />
        </section>
        <section className='profile-container--activity-tracker'>
          <ActivityTracker data={userScoresData} username={username} />
        </section>
      </div>
    </main>
  )
}

export default Profile
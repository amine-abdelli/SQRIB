import React from 'react'
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import { PlayerDetail, UserRank, UserStats, WeeklyTracker } from './components';
import '../../theme/pages/_Profile.scss';

const ProfileModule = (props: ProfileEngineProps) => {
  return (
    <div className="profile-container--wrapper">
      <section className='profile-container--top-section'>
        <PlayerDetail {...props} />
        <WeeklyTracker />
      </section>
      <section className='profile-container--user-stats'>
        <UserStats />
        <UserRank />
      </section>
    </div>
  )
}

export { ProfileModule };
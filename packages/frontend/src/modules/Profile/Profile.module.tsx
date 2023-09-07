import React from 'react'
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import { PlayerDetail, UserStats, WeeklyTracker } from './components';
import '../../theme/pages/_Profile.scss';

const ProfileModule = (props: ProfileEngineProps) => {
  return (
    <div className="profile-container--wrapper">
      <section className='profile-container--top-section'>
        <PlayerDetail {...props} />
        <WeeklyTracker />
      </section>
      <section className='profile-container--palmares-summary'>
        <UserStats />
      </section>
    </div>
  )
}

export { ProfileModule };
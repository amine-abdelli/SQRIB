import React from 'react'
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import '../../theme/pages/_Profile.scss'
import { PlayerDetail, WeeklyTracker } from './components';

const ProfileModule = (props: ProfileEngineProps) => {
  return (
    <div className="profile-container--wrapper">
      <section className='profile-container--top-section'>
        <PlayerDetail {...props} />
        <WeeklyTracker />
      </section>
    </div>
  )
}

export { ProfileModule };
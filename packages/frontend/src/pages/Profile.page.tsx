import React from 'react';
import { ProfileModule } from '../modules/Profile/Profile.module';
import { ProfileEngine } from '../modules/Profile/Engine';
import { ProfileEngineProps } from '../modules/Profile/Engine/ProfileEngine.props';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import { HomeButton } from '../components/HomeButton/HomeButton.component';
import '../theme/pages/_Profile.scss';

const Profile = () => {
  document.title = 'Profile';
  return (
    <main className="layout--main profile--main">
      <span style={{ position: 'absolute', left: '1.5rem', height: '3rem', width: '3rem', top: '1.5rem' }}>
        <HomeButton />
      </span>
      <ProfileEngine>
        <MovingBackground />
        <ProfileModule {...{} as ProfileEngineProps} />
      </ProfileEngine>
    </main>
  )
}

export default Profile
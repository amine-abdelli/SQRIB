import React from 'react';
import { ProfileModule } from '../modules/Profile/Profile.module';
import { ProfileEngine } from '../modules/Profile/Engine';
import { ProfileEngineProps } from '../modules/Profile/Engine/ProfileEngine.props';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import '../theme/pages/_Profile.scss';

const Profile = () => {
  return (
    <main className="layout--main profile--main">
      <ProfileEngine>
        <MovingBackground />
        <ProfileModule {...{} as ProfileEngineProps} />
      </ProfileEngine>
    </main>
  )
}

export default Profile
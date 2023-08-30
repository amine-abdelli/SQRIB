import React from 'react';
import { ProfileModule } from '../modules/Profile/Profile.module';
import { ProfileEngine } from '../modules/Profile/Engine';
import { ProfileEngineProps } from '../modules/Profile/Engine/ProfileEngine.props';

const Profile = () => {
  return (
    <main style={{ width: "100%" }}>
      <ProfileEngine>
        <ProfileModule {...{} as ProfileEngineProps} />
      </ProfileEngine>
    </main>
  )
}

export default Profile
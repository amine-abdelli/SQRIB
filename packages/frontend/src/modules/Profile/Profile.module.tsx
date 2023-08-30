import React from 'react'
import { ProfileEngineProps } from './Engine/ProfileEngine.props';
import '../../theme/pages/_Profile.scss'
import { Card } from '../../components/Card/Card.component';
import { PlayerDetail } from './components/PlayerDetail/PlayerDetail.component';

const ProfileModule = (props: ProfileEngineProps) => {
  return (
    <div className="profile-container--wrapper">
      <PlayerDetail {...props} />
    </div>
  )
}

export { ProfileModule };
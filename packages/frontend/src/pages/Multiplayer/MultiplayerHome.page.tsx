import React from 'react'

import { HomeHeader } from '../../modules/Multiplayer/HomeHeader/HomeHeader.component'
import { JoinCard } from '../../modules/Multiplayer'

const MultiplayerHome = () => {
  return (
    <section style={{ padding: '1rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '40rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <HomeHeader />
        <JoinCard />
      </div>
    </section>
  )
}

export default MultiplayerHome
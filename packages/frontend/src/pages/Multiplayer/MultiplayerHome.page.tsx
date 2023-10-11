import React from 'react'

import { HomeHeader } from '../../modules/Multiplayer/HomeHeader/HomeHeader.component'
import { JoinCard } from '../../modules/Multiplayer'

const MultiplayerHome = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const redirectTo = searchParams.get('redirectTo') ?? undefined

  return (
    <section style={{ padding: '1rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ width: '40rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <HomeHeader />
        <JoinCard redirectTo={redirectTo} />
      </div>
    </section >
  )
}

export default MultiplayerHome
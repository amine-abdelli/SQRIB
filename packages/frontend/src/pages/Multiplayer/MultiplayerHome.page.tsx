import React from 'react'

import { HomeHeader } from '../../modules/Multiplayer/HomeHeader/HomeHeader.component'
import { JoinCard } from '../../modules/Multiplayer'
import { MultiplayerLayout } from '../../layouts/desktop/MultiplayerLayout.desktop'

const MultiplayerHome = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const redirectTo = searchParams.get('redirectTo') ?? undefined

  return (
    <MultiplayerLayout>
      <div style={{ width: '40rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <HomeHeader />
        <JoinCard redirectTo={redirectTo} />
      </div>
    </MultiplayerLayout>
  )
}

export default MultiplayerHome
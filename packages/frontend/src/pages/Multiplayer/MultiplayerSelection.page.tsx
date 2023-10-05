import React, { useEffect } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTES } from '../../routes/paths'
import { RoomList } from '../../modules/Multiplayer/RoomList/RoomList.component'

const MultiplayerRoomSelection = () => {
  const { username } = usePlayer()
  const navigate = useNavigate()
  useEffect(() => {
    if (!username) {
      navigate(MAIN_ROUTES.MULTIPLAYER)
    }
  }, [])
  return (
    <section className='layout--main' style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <RoomList />
    </section>
  )
}

export default MultiplayerRoomSelection
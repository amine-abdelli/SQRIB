import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { IRoomList, SocketPreGameEventsEnum } from '@sqrib/shared'

import { RoomList } from '../../modules/Multiplayer/RoomList/RoomList.component'
import { useSocket } from '../../contexts/SocketContext'
import { TOAST_ID } from '../../theme/toast'

const MultiplayerRoomSelection = () => {
  const [roomId, setRoomId] = React.useState<string>('')
  const [roomList, setRoomList] = React.useState<IRoomList>([])
  const { emit, listen } = useSocket()

  useEffect(() => {
    emit(SocketPreGameEventsEnum.GET_SESSIONS)
    return () => {
      toast.dismiss(TOAST_ID.PICK_USERNAME_WARNING)
    }
  }, [])

  // Populate room list
  listen(SocketPreGameEventsEnum.GET_SESSIONS, (data) => {
    setRoomList(data.sessions)
  })


  return (
    <section className='layout--main' style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <RoomList roomList={roomList} roomId={roomId} setRoomId={setRoomId} />
    </section >
  )
}

export default MultiplayerRoomSelection
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { IRoomList, SocketPreGameEventsEnum } from '@sqrib/shared'

import { RoomList } from '../../modules/Multiplayer/RoomList/RoomList.component'
import { useSocket } from '../../contexts/SocketContext'
import { TOAST_ID } from '../../theme/toast'
import { MultiplayerLayout } from '../../layouts/desktop/MultiplayerLayout.desktop'

const MultiplayerRoomSelection = () => {
  const [roomId, setRoomId] = React.useState<string>('')
  const [roomList, setRoomList] = React.useState<IRoomList>([])
  const { emit, listen } = useSocket()

  useEffect(() => {
    emit(SocketPreGameEventsEnum.GET_SESSION_LIST)
    return () => {
      toast.dismiss(TOAST_ID.PICK_USERNAME_WARNING)
    }
  }, [])

  // Populate room list
  listen(SocketPreGameEventsEnum.GET_SESSION_LIST, (data) => {
    setRoomList(data.sessions)
  })


  return (
    <MultiplayerLayout>
      <RoomList roomList={roomList} roomId={roomId} setRoomId={setRoomId} />
    </MultiplayerLayout>
  )
}

export default MultiplayerRoomSelection
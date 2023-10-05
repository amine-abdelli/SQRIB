import React from 'react'
import { Card } from '../../components/Card/Card.component'
import { Text } from '../../components/Text/Text.component'
import { ClipBoard } from '../../modules/Multiplayer/ClipBoard/ClipBoard.component'

const MultiplayerCreateSession = () => {
  return (
    <section className='layout--main layout--section'>
      <Card>
        <Text h2 bold fira>Session</Text>
      </Card>
      <ClipBoard url='https://www.sqrib.io/multiplayer' />
    </section>
  )
}

export default MultiplayerCreateSession
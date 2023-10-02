import React from 'react'
import { Card } from '../../../components/Card/Card.component'
import { Text } from '../../../components/Text/Text.component'
import { Input } from '../../Auth/components'
import Notification from '../../../components/Notification/Notification.component'
import { Button } from '../../../components/Button/Button.component'
import { Spacer, SpacerSize } from '../../../components'

const JoinCard = () => {
  return (
    <Card style={{ width: '100%', padding: '2rem 1.5rem' }}>
      <Text h2 fira>WELCOME TO SQRIB.IO MULTIPLAYER</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <Text p fira>Get ready to unleash your typing skills and conquer the leaderboard! Are you the fastest typer in the universe? There's only one way to find out.</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <Text p fira>Enter a username, or leave it blank to get a random one.</Text>
      <Input name='' placeholder='Username' />
      <Notification type='error' message='SQRIB.IO is in alpha. Please report bugs when you see them!' />
      <Button onClick={() => null}>JOIN</Button>
    </Card>
  )
}

export { JoinCard }
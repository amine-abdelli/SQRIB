import React from 'react'
import { useGetUserRank } from '../../../../api/queries/useGetUserRank.hooks'
import { Card } from '../../../../components/Card/Card.component'
import { UserRankCard, UserRankHeader } from './subComponents'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'

const UserRank = () => {
  const { data } = useGetUserRank()
  const range = data?.data?.range ?? []
  const totalUsers = data?.data?.total_users
  return (
    <Card className='user--rank'>
      <Text h1 bold>Rank</Text>
      <Text h3 bold fira>Your Standing in the Community</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <Text italic>See how you measure up against typists near your rank.</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <Text italic>Total players: </Text><Text bold>{totalUsers}</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <UserRankHeader />
      {range.map((p: any) => (
        <UserRankCard user={p} />
      ))}
    </Card>
  )
}

export { UserRank }

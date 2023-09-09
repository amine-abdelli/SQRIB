import React from 'react'
import { useGetUserRank } from '../../../../api/queries/useGetUserRank.hooks'
import { Card } from '../../../../components/Card/Card.component'
import { UserRankCard } from './subComponents'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'

const UserRank = () => {
  const { data } = useGetUserRank()
  const range = data?.data?.range ?? []
  const totalUsers = data?.data?.total_users
  const userRank = data?.data?.user_rank
  return (
      <Card className='user--rank' style={{ width: '100%' }}>
        <Text centered h3 bold>Your Standing in the Community</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <Text centered italic>See how you measure up against typists near your rank.</Text>
        <Spacer y size={SpacerSize.MEDIUM} />
        {range.map((p: any) => (
          <UserRankCard user={p} />
        ))}
      </Card>
  )
}

export { UserRank }

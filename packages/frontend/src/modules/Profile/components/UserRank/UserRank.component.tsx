import React from 'react'
import { useGetUserRank } from '../../../../api/queries/useGetUserRank.hooks'
import { Card } from '../../../../components/Card/Card.component'
import { UserRankCard, UserRankHeader } from './subComponents'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'

const UserRank = ({ username }: UserRankProps) => {
  const { data, refetch } = useGetUserRank({ username });

  React.useEffect(() => {
    refetch();
  }, [username])

  const isConsultingOwnProfile = !username;
  const range = data?.data?.range ?? []
  const totalUsers = data?.data?.total_users
  // TODO Add a target to focus user and a reload button
  // TODO Add a pagination or a load on scroll
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
        <UserRankCard user={p} isCurrent={isConsultingOwnProfile} />
      ))}
    </Card>
  )
}

export { UserRank }

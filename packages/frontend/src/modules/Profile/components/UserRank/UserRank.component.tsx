import React from 'react'
import { useGetUserRank } from '../../../../api/queries/useGetUserRank.hooks'
import { Card } from '../../../../components/Card/Card.component'
import { UserRankCard, UserRankHeader } from './subComponents'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'
import { capitalizeFirstLetter } from '../../../../utils'
import { UserRankProps } from './UserRank.props'

const UserRank = ({ username }: UserRankProps) => {
  const { data, refetch } = useGetUserRank({ username });

  React.useEffect(() => {
    refetch();
  }, [username])

  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentCardRef = React.useRef<HTMLDivElement>(null);
  // Focus on the current user within the rank container
  React.useEffect(() => {
    if (containerRef.current && currentCardRef.current) {
      const container = containerRef.current;
      const card = currentCardRef.current;

      // Calculate the position
      const topPos = card?.getBoundingClientRect().top - container?.getBoundingClientRect().top;

      // Scroll to the position
      container.scrollTop = topPos;
    }
  }, [username, data]);

  const isVisitingOwnProfile = !username;
  const range = data?.data?.range ?? []
  const totalUsers = data?.data?.total_users
  // TODO Add a target to focus user and a reload button
  // TODO Add a pagination or a load on scroll
  return (
    <Card className='user--rank'>
      <Text h1 bold>Rank</Text>
      {isVisitingOwnProfile ? <Text h3 bold fira>Your Standing in the Community</Text> : <Text h3 bold fira>{capitalizeFirstLetter(username)}'s Standing in the Community</Text>}
      <Spacer y size={SpacerSize.SMALL} />
      {isVisitingOwnProfile ? <Text italic>See how you measure up against typists near your rank.</Text> : ''}
      <Spacer y size={SpacerSize.MEDIUM} />
      <Text italic>Total players: </Text><Text bold>{totalUsers}</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <UserRankHeader />
      <Spacer y size={SpacerSize.SMALL} />
      <div
        className='user--rank__card--wrapper'
        ref={containerRef}
      >
        {range.map((p: any) => (
          <UserRankCard
            key={p.username}
            user={p}
            isCurrent={isVisitingOwnProfile}
            containerRef={p.current ? currentCardRef : null}
          />
        ))}
      </div>
    </Card>
  )
}

export { UserRank }
// ::-webkit-scrollbar{
//   display: none;
// }

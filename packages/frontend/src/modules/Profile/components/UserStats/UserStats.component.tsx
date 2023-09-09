import React from 'react';
import { Card } from '../../../../components/Card/Card.component';
import { UserStatItem } from './subComponents';
import { useGetUserStats } from '../../../../api/queries/useGetUserStats.hooks';
import { Text } from '../../../../components/Text/Text.component';

const UserStats = () => {
  const { data: userStatsData, isLoading } = useGetUserStats();
  const { session_count, average_wpm, best_points, days_of_activity, average_accuracy, total_words_typed, best_wpm, total_time_in_seconds, total_points } = userStatsData?.data || {};
  return (
    <Card className='user-stats'>
      <Text h1 bold>Summary</Text>
      <div>
        <UserStatItem isLoading={isLoading} label='Session count' value={session_count ?? 0} />
        <UserStatItem isLoading={isLoading} best label='Best wpm' value={best_wpm ?? 0} />
        <UserStatItem isLoading={isLoading} label='Average accuracy' value={average_accuracy ?? 0} />
        <UserStatItem isLoading={isLoading} label='Average wpm' value={average_wpm ?? 0} />
        <UserStatItem isLoading={isLoading} label='Best points' value={best_points ?? 0} />
        <UserStatItem isLoading={isLoading} label='Days of activity' value={days_of_activity ?? 0} />
        <UserStatItem isLoading={isLoading} label='Words typed' value={total_words_typed ?? 0} />
        <UserStatItem isLoading={isLoading} label='Total time' value={total_time_in_seconds ?? 0} />
        <UserStatItem isLoading={isLoading} label='Total points' value={total_points ?? 0} />
      </div>
    </Card>
  )
}

export { UserStats };
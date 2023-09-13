import React from 'react'
import { Card } from '../../../../../components/Card/Card.component';
import { Activity } from './subComponents';
import { useGetUserWeeklyTracker } from '../../../../../api/queries/useGetWeeklyTracker.hooks';
import { weeklyDays } from '@sqrib/shared';
import { Text } from '../../../../../components/Text/Text.component';
import '../../../../../components/Scoring/Scoring.style.scss';
import { CountTracker } from './subComponents/SessionCount';
import { Spacer, SpacerSize } from '../../../../../components';
import { WeeklyTrackerProps } from './WeeklyTracker.props';
import './WeeklyTracker.style.scss';

const WeeklyTracker = ({ username }: WeeklyTrackerProps) => {
  const { data: response, refetch } = useGetUserWeeklyTracker({ username });
  React.useEffect(() => {
    refetch();
  }, [username])
  const { data } = response || { data: null };
  const daysOfActivity = data?.daysOfActivity;
  const sessionCount = data?.sessionCount;
  const typedWordsCount = data?.typedWordsCount
  const todayIndex = new Date().getDay();
  const today = weeklyDays[todayIndex === 0 ? 6 : todayIndex - 1];
  return (
    <Card className='weekly-tracker--card'>
      <div className='weekly-tracker--header'>
        <Text h1 bold centered>Weekly Tracker</Text>
      </div>
      <Spacer y size={SpacerSize.SMALL} />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <CountTracker count={sessionCount} label={`Session${sessionCount > 1 ? 's' : ''}`} />
        <CountTracker count={typedWordsCount} label='Typed words' />
      </div>
      <Spacer y size={SpacerSize.MEDIUM} />
      <div className='weekly-tracker--wrapper'>
        {weeklyDays.map((day, index) => {
          const indexOfTheDay = weeklyDays.indexOf(today);
          return <Activity today={today === day} toCome={indexOfTheDay < index} hasPlayed={daysOfActivity?.includes(day)} label={day.charAt(0)} />
        })}
      </div>
    </Card>
  )
}

export { WeeklyTracker };
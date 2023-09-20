import React from 'react'
import { formatDateToCalendar } from '@sqrib/shared';
import { Card } from '../../../../../components/Card/Card.component';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Text } from '../../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../../components';
import './ActivityTracker.style.scss'

const ActivityTracker = ({ data: userScoresData, username }: any) => {
  // Calculate today's date
  const today = new Date();
  // Calculate the date 365 days ago
  const lastYear = new Date();
  lastYear.setDate(today.getDate() - 365);
  const isVisitingOwnProfile = !username;
  return (
    <Card className='activity-tracker'>
      {isVisitingOwnProfile ? <Text h1 bold className='activity-tracker--title'>Track Your Activity</Text> : <Text h1 bold className='activity-tracker--title'>Activity tracker</Text>}
      <Spacer y size={SpacerSize.MEDIUM} />
      {isVisitingOwnProfile
        ? <Text p fira className='activity-tracker--description'>Track your typing activity over the past year. The calendar below shows your typing activity for each day. The darker the color, the higher your session count.</Text>
        : <></>}
      <Spacer y size={SpacerSize.MEDIUM} />
      <div style={{ width: 'auto' }}>
        {userScoresData
          ? <CalendarHeatmap
            endDate={today}
            startDate={lastYear}
            values={(userScoresData)?.data?.map((score: any) => ({ date: formatDateToCalendar(score.created_at), count: score.wpm ?? 0 }))} />
          : <></>}
      </div>
    </Card>
  );
}

export { ActivityTracker }
import React from 'react'
import { formatDateToCalendar } from '@sqrib/shared';
import { Card } from '../../../../../components/Card/Card.component';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Text } from '../../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../../components';

const ActivityTracker = ({ data: userScoresData, username }: any) => {
  // Calculate today's date
  const today = new Date();
  // Calculate the date 365 days ago
  const lastYear = new Date();
  lastYear.setDate(today.getDate() - 365);
  const isVisitingOwnProfile = !username;
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1rem' }}>
      {isVisitingOwnProfile ? <Text h1 bold>Track Your Activity</Text> : <Text h1 bold>Activity tracker</Text>}
      <Spacer y size={SpacerSize.MEDIUM} />
      {isVisitingOwnProfile
        ? <Text p thin fira>Track your typing activity over the past year. The calendar below shows your typing activity for each day. The darker the color, the higher your session count.</Text>
        : <></>}
      <Spacer y size={SpacerSize.MEDIUM} />
      <div style={{ width: '60rem' }}>
        <CalendarHeatmap
          endDate={today}
          startDate={lastYear}
          values={(userScoresData ?? { data: [] })?.data?.map((score: any) => ({ date: formatDateToCalendar(score.created_at), count: score.wpm }))}
        />
      </div>
    </Card>
  );
}

export { ActivityTracker }
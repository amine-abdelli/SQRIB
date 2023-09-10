import React from 'react'
import { formatDateToCalendar } from '@sqrib/shared';
import { Card } from '../../../../../components/Card/Card.component';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Text } from '../../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../../components';

const ActivityTracker = ({ data: userScoresData }: any) => {
  // Calculate today's date
  const today = new Date();
  // Calculate the date 365 days ago
  const lastYear = new Date();
  lastYear.setDate(today.getDate() - 365);
  return (
    <Card style={{ display: 'flex', flexDirection: 'column',flex: 1, padding: '1rem' }}>
      <Text h1 bold>Track Your Activity </Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <Text p thin fira>Track your typing activity over the past year. The calendar below shows your typing speed (WPM) for each day. The darker the color, the higher your WPM.</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <div style={{ width: '60rem'}}>
        <CalendarHeatmap
          endDate={today}
          startDate={lastYear}
          values={(userScoresData ?? { data: []})?.data?.map((score: any) => ({ date: formatDateToCalendar(score.created_at), count: score.wpm }))}
        />
      </div>
    </Card>
  );
}

export { ActivityTracker }
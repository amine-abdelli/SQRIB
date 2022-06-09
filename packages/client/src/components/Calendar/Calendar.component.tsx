/* eslint-disable max-len */
import React, { PropsWithChildren } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import _ from 'lodash';
import {
  calendarColors, formatDate, formatDateToCalendar, ScoreType, topValue,
} from '@aqac/utils';
import {
  Tab, Tabs,
} from '@blueprintjs/core';
import { ITheme } from '../../../styles/theme';

function Calendar({ scores, theme }: { scores: ScoreType[], theme: ITheme }) {
  const formatedHistoryToCalendar = scores.map((day: ScoreType) => (
    {
      day: day?.created_at,
      date: formatDate(day?.created_at as Date),
      value: day.mpm,
    }
  ));

  const groupedScores = _.groupBy(formatedHistoryToCalendar, 'date');
  const calendarData = Object.values(groupedScores).map((gs) => ({
    day: formatDateToCalendar(gs[0].day as Date),
    number: gs.length,
    value: gs.length,
    bestRecord: topValue(gs, 'value'),
    date: gs[0].day,
  }));

  const dateGroupedByYear = _.unionBy(
    Object.keys(groupedScores).map(
      (a: string) => a.split(' ').at(-1),
    ),
  );
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 0 }}>CALENDRIER</h1>
      <hr style={{ border: '1px solid' }} />
      <Tabs id="calendarid" key="calendar" animate defaultSelectedTabId={dateGroupedByYear.at(-1)}>
        {dateGroupedByYear.map((a: string | undefined) => (
          <Tab
            id={a}
            title={a}
            key={a}
            panel={(
              <div style={{ height: '175px', margin: 0 }}>
                <ResponsiveCalendar
                  data={calendarData}
                  from={`${a}-01-01`}
                  to={`${a}-12-31`}
                  emptyColor={theme.primary}
                  colors={calendarColors}
                  monthBorderWidth={1}
                  monthSpacing={5}
                  monthBorderColor={theme.tertiary}
                  yearSpacing={40}
                  dayBorderWidth={1}
                  dayBorderColor={theme.secondary}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'row',
                      translateY: 36,
                      itemCount: 4,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: 'right-to-left',
                    },
                  ]}
                      // eslint-disable-next-line react/no-unstable-nested-components
                  tooltip={(data: PropsWithChildren<any>) => (
                    <div style={{
                      backgroundColor: 'white', borderRadius: '10px', padding: '10px', border: `${data.color} solid 1px`,
                    }}
                    >
                      <p style={{ margin: 0 }}>{formatDate(data.date, 'fr')}</p>
                      <p style={{ margin: 0 }}>
                        Parties joués:
                        {' '}
                        {data?.data.number}
                      </p>
                      <p style={{ margin: 0 }}>
                        Meilleur score:
                        {' '}
                        {data?.data.bestRecord}
                      </p>
                    </div>
                  )}
                />
              </div>
                )}
          />
        ))}
      </Tabs>
    </div>
  );
}

export default Calendar;

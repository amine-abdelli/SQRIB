/* eslint-disable max-len */
import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import _ from 'lodash';
import { formatDate, formatDateToCalendar, topValue } from '@aqac/utils';
import {
  Divider, Tab, Tabs,
} from '@blueprintjs/core';
import { ITheme } from '../../../styles/theme';

function Calendar({ scores, theme }: { scores: any, theme: ITheme }) {
  const formatedHistoryToCalendar = scores.map((day: any) => (
    {
      day: day?.createdAt,
      date: formatDate(day?.createdAt),
      value: day.mpm,
    }
  ));

  const groupedScore = _.groupBy(formatedHistoryToCalendar, 'date');
  const wesh = Object.values(groupedScore).map((a: any) => ({
    day: formatDateToCalendar(a[0].day),
    number: a.length,
    value: a.length,
    bestRecord: topValue(a, 'value'),
    date: a[0].day,
  }));
  const hahaha = _.unionBy(Object.keys(groupedScore).map((a: any) => a.split(' ').at(-1)));
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: 0 }}>CALENDRIER</h1>
      <Divider style={{ margin: 0 }} />
      <Tabs id="calendarid" key="calendar" animate defaultSelectedTabId={hahaha.at(-1)}>
        {hahaha.map((a: string) => (
          <Tab
            id={a}
            title={a}
            key={a}
            panel={(
              <div style={{ height: '175px', margin: 0 }}>
                <ResponsiveCalendar
                  data={wesh}
                  from={`${a}-01-01`}
                  to={`${a}-12-31`}
                  // minValue={0}
                  // maxValue={100}
                  emptyColor="#eeeeee"
                  colors={['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788', '#40916c', '#2d6a4f', '#1b4332']}
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
                  tooltip={(data: any) => (
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

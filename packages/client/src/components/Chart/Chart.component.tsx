import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { topValue } from '@aqac/utils';
import { Divider } from '@blueprintjs/core';
import { BsStars } from 'react-icons/bs';
import styles from './Chart.module.scss';

function Chart({ scores, topMpm }: { scores: any, topMpm: number }) {
  const dataChart = [{
    id: 'mpm',
    data: [{ x: 0, y: 0 }, ...scores.map((day: any, i: number) => ({
      x: i + 1,
      y: day.mpm,
    }))],
  }];

  return (
    <div style={{ height: '200px', marginBottom: '80px' }}>
      <h1 style={{ textAlign: 'center' }}>PROGRESSION</h1>
      <Divider style={{ margin: 0 }} />
      <ResponsiveLine
        data={dataChart}
        curve="monotoneX"
        margin={{
          top: 20, right: 50, bottom: 45, left: 50,
        }}
        lineWidth={1}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear', min: 0, max: topValue(scores, 'mpm') + 10, stacked: true, reverse: false,
        }}
        yFormat=" >-.2f"
        enableArea
        colors={{ scheme: 'category10' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: 'historique',
          legendOffset: 36,
          legendPosition: 'middle',
          tickRotation: -43,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'mpm',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointColor={{
          theme: 'background',
        }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
        pointSize={0}
        // eslint-disable-next-line react/no-unstable-nested-components
        tooltip={({ point }: any) => (
          <p
            className={styles.chartTooltip}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              border: `3px solid ${point.data.y === topMpm ? 'gold' : 'white'}`,
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            {point.data.y === topMpm && <BsStars style={{ marginRight: '3px' }} color='gold' />}
            {`${point.data.y} mpm`}
          </p>
        )}
      />
    </div>
  );
}

export default Chart;

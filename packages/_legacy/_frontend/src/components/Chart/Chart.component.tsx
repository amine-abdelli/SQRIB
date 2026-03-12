import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { isSolo, ScoreType, topValue } from '@sqrib/utils';
import { BsStars } from 'react-icons/bs';
import { Text } from '@nextui-org/react';
import styles from './Chart.module.scss';
import { theme } from '../../../styles/theme';
import Button from '../../UI/Button/Button.component';
import Spacer from '../../UI/Spacer/Spacer.component';

enum ChartTypeEnum {
  SOLO = 'solo',
  MULTI = 'multi'
}
function Chart({ scores }: { scores: ScoreType[] }) {
  const [chartType, setChartType] = useState(ChartTypeEnum.SOLO);
  const soloScores = scores.filter(isSolo);
  const multiScores = scores.filter((score: ScoreType) => !isSolo(score));
  const Charts = {
    solo: {
      id: 'solo',
      data: [...soloScores.map((day: any, i: number) => ({
        x: i + 1,
        y: day.mpm,
      }))],
    },
    multi: {
      id: 'multiplayer',
      data: [...multiScores.map((day: any, i: number) => ({
        x: i + 1,
        y: day.mpm,
      }))],
    },
  };
  return (
    <div style={{ width: '100%', height: '200px', marginBottom: '80px' }}>
      <h1 className={styles.statTitle}>PROGRESSION</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button stretch secondary={!(chartType === ChartTypeEnum.SOLO)} text='solo' onClick={() => setChartType(ChartTypeEnum.SOLO)} />
        <Spacer />
        <Button stretch secondary={!(chartType === ChartTypeEnum.MULTI)} text='multijoueur' onClick={() => setChartType(ChartTypeEnum.MULTI)} />
      </div>
      <ResponsiveLine
        data={[Charts[chartType]]}
        curve="monotoneX"
        margin={{
          top: 20, right: 0, bottom: 45, left: 50,
        }}
        lineWidth={4}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear', min: 0, max: topValue(chartType === ChartTypeEnum.MULTI ? multiScores : soloScores, 'mpm') + 5, stacked: true, reverse: false,
        }}
        yFormat=" >-.2f"
        colors={[(chartType === ChartTypeEnum.SOLO) ? theme.primary : theme.secondary]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          tickRotation: -10,
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
          <Text
            className={styles.chartTooltip}
            style={{
              border: `3px solid ${point.data.y === topValue(chartType === ChartTypeEnum.MULTI ? multiScores : soloScores, 'mpm') ? 'gold' : 'white'}`,
            }}
          >
            {point.data.y === topValue(chartType === ChartTypeEnum.MULTI ? multiScores : soloScores, 'mpm') && <BsStars style={{ marginRight: '3px' }} color='gold' />}
            {`${point.data.y} mpm`}
          </Text>
        )}
      />
    </div>
  );
}

export default Chart;

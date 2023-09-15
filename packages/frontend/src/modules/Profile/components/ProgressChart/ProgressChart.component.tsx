import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Card } from '../../../../components/Card/Card.component';
import { Text } from '../../../../components/Text/Text.component';
import { COLORS } from '../../../../theme/colors';
import { Spacer, SpacerSize } from '../../../../components';
import { useGetGlobalMetrics } from '../../../../api/queries/useGetGlobalMetrics.hooks';

interface ProgressChartProps {
  scores: any;
  username?: string;
}

const ProgressChart = ({ scores: userScoresData, username }: ProgressChartProps) => {
  const { data: globalMetrics } = useGetGlobalMetrics();
  const userScores = userScoresData?.data ?? [];
  const scoresToChartFormat = userScores.length === 1
    ? [{ x: 0, y: userScores[0].wpm }, { x: 1, y: userScores[0].wpm }]
    : userScores.map((score: any, index: string) => ({ x: index, y: score.wpm }));

  const bestSqribWpm = globalMetrics?.data?.best_wpm ?? 0;
  const averageSqribAccuracy = globalMetrics?.data?.average_accuracy ?? 0;
  const bestSqribWpmToChartFormat = [{ x: 0, y: bestSqribWpm }, { x: userScores.length > 1 ? userScores.length - 1 : 1, y: bestSqribWpm }]
  const averageSqribUserScore = [{ x: 0, y: averageSqribAccuracy }, { x: userScores.length > 1 ? userScores.length - 1 : 1, y: averageSqribAccuracy }]
  const isVisitingOwnProfile = !username;

  return (
    <Card style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1rem' }}>
      {isVisitingOwnProfile ? <Text h1 bold>Track Your Progress</Text> : <Text h1 bold>Progress chart</Text>}
      {isVisitingOwnProfile && <Spacer y size={SpacerSize.MEDIUM} />}
      {isVisitingOwnProfile
        ? <Text p thin fira>Watch your typing speed improve and set new goals! The chart below captures your journey by tracking your Words Per Minute (WPM) across various sessions. Compare your progress with the Sqrib community's average and top speeds to see how you measure up. Keep typing, keep improving!🚀</Text>
        : <></>}
      <div style={{ height: '22rem' }}>
        <ResponsiveLine
          animate={true}
          enableGridX={false}
          isInteractive
          pointLabelYOffset={-12}
          enableCrosshair
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Timeline',
            legendOffset: 36,
            legendPosition: 'middle',
            // renderTick: props => {
            //   const transformProperty = `translate(${props.x},${props.y})`;
            //   // Change the modulo value if you want to display more or less ticks
            //   if (props.tickIndex % 2 === 0) {
            //     return (
            //       <g transform={transformProperty}>
            //         <line x1='0' x2='0' y1='0' y2='3' style={{ stroke: 'rgb(119, 119, 119)', strokeWidth: 1 }}></line>
            //         <text dominantBaseline='central' textAnchor='end' transform='translate(4,15)' fontSize={11}>
            //           {props.value}
            //         </text>
            //       </g>
            //     );
            //   }
            //   return <></>;
            // },
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'square',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
            }
          ]}
          pointSize={4}
          pointBorderWidth={1}
          pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Wpm',
            legendOffset: -40,
            legendPosition: 'middle',
            renderTick: props => {
              const transformProperty = `translate(${props.x},${props.y})`;
              if (props.tickIndex % 2 === 0) {
                return (
                  <g transform={transformProperty}>
                    <line x1='0' x2='-5' y1='0' y2='0' style={{ stroke: 'rgb(119, 119, 119)', strokeWidth: 1 }}></line>
                    <text dominantBaseline='central' textAnchor='end' transform='translate(-10,0)' fontSize={11}>
                      {props.value}
                    </text>
                  </g>
                );
              }
              return <></>;
            },
          }}
          margin={{ top: 50, right: 150, bottom: 50, left: 50 }}
          yScale={{
            type: 'linear',
            min: 0,
            max: bestSqribWpm ? bestSqribWpm + 15 : 100,
          }}
          xScale={{ type: 'point' }}
          data={[
            {
              "id": "Your progression",
              "data": scoresToChartFormat
            },
            {
              "id": "Average global Wpm",
              "data": averageSqribUserScore
            },
            {
              "id": "Best global Wpm",
              "data": bestSqribWpmToChartFormat
            }
          ]}
          tooltip={({ point }: any) => {
            return <p>{point?.data.y}</p>
          }}
          colors={[COLORS.DARK_GREEN, COLORS.ERROR, COLORS.GOLD]}
        />
      </div>
    </Card>
  )
}

export { ProgressChart }
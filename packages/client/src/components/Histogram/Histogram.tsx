import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Divider } from '@blueprintjs/core';
import { randomIntFromInterval } from '@sqrib/utils';

const data = Array.from({ length: 100 }).map((_, i: number) => ({
  mpm: i,
  mpmAmount: randomIntFromInterval(0, 100),
  mpmColor: 'hsl(328, 70%, 50%)',
}));

function Histogram() {
  return (
    <div style={{ height: '300px', width: '100%', marginBottom: '20px' }}>
      <h1 style={{ textAlign: 'center', margin: 0 }}>HISTOGRAMME</h1>
      <p style={{ textAlign: 'center' }}>
        <em>Cet histogramme permet de vous situer dans la moyenne de tous les joueurs</em>
      </p>
      <Divider style={{ margin: 0 }} />
      <ResponsiveBar
        data={data}
        keys={['mpmAmount']}
        indexBy="mpm"
        margin={{
          top: 50, right: 15, bottom: 100, left: 60,
        }}
        padding={0}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blues' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: (a: any) => a % 5 === 0 && `${a} mpm`,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 15,
          legend: 'Mots par minute',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Nombre de joueur',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        role="application"
        ariaLabel="Nivo bar chart demo"
      />
    </div>
  );
}

export default Histogram;

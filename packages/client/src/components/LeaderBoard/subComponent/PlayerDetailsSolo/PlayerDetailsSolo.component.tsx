/* eslint-disable max-len */
import {
  formatDate, ScoreType, topValue,
} from '@aqac/utils';
import {
  Card, Table, Text,
} from '@nextui-org/react';
import React from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';

function PlayerDetailsSolo({ scores, details }: { scores: ScoreType[], details: any }) {
  const { isMediumScreen } = useWindowSize();

  const tableColumn = isMediumScreen
    ? [
      { name: 'Mpm', uid: 'mpm' },
      { name: 'Precision', uid: 'precision' },
      { name: 'Points', uid: 'points' },
      { name: 'Language', uid: 'language' },
    ]
    : [
      { name: 'Mpm', uid: 'mpm' },
      { name: 'Precision', uid: 'precision' },
      { name: 'Points', uid: 'points' },
      { name: 'Language', uid: 'language' },
      { name: 'Date', uid: 'date' },
    ];
  const scoresToTableData = scores
    ?.sort((a: ScoreType, b: ScoreType) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    ?.filter(({ username }) => username)
    .map((score, index) => ({
      mpm: score.mpm,
      precision: score.precision,
      points: score.points,
      language: score.language,
      date: formatDate(score.created_at as any),
      key: index,
    }));
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }} className='flex'>
        <Card style={{
          width: '12rem',
          display: 'inline-block',
          margin: '1rem 1rem 0 1rem',
          height: '4.5rem',
          flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ fontSize: isMediumScreen ? '10px' : '', textAlign: 'center' }}>Parties jouées</Text>
          <Text style={{ textAlign: 'center' }}>{scores.length}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ fontSize: isMediumScreen ? '10px' : '', textAlign: 'center' }}>Meilleur mpm</Text>
          <Text style={{ textAlign: 'center' }}>{topValue(scores, 'mpm')}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ fontSize: isMediumScreen ? '10px' : '', textAlign: 'center' }}>Dernière activité</Text>
          <Text style={{ fontSize: isMediumScreen ? '14px' : '', textAlign: 'center' }}>{formatDate(details?.last_activity, 'short')}</Text>
        </Card>
      </div>
      <div>
        <Table
          shadow={false}
          aria-label="Table showing user scores in solo"
          css={{ width: '100%' }}
          color="secondary"
          fixed
          hoverable
        >
          <Table.Header columns={tableColumn}>
            {(column) => (
              <Table.Column css={{ textAlign: 'center' }} key={column.uid}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={scoresToTableData}
          >
            {(item: any) => (
              <Table.Row css={{ textAlign: 'center' }} key={item.name}>
                {(key) => (
                  <Table.Cell>
                    {item[key]}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={7}
            color='primary'
          />
        </Table>
      </div>
    </>
  );
}

export default PlayerDetailsSolo;

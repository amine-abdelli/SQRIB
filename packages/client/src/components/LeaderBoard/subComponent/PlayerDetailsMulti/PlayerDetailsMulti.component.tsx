import {
  formatDate, Game, topValue,
} from '@aqac/utils';
import {
  Card, Table, Text,
} from '@nextui-org/react';
import React from 'react';
import { useGetSelf } from '../../../../hooks/useGetSelf';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { PlayerDetailsMultiProps } from './PlayerDetailsMulti.props';

function PlayerDetailsMulti({ games, details }: PlayerDetailsMultiProps) {
  const { data: selfData } = useGetSelf();
  const { isMediumScreen } = useWindowSize();
  const tableColumn = isMediumScreen ? [
    { name: 'Victoire', uid: 'hasWon' },
    { name: 'Mpm', uid: 'mpm' },
    { name: 'Mots', uid: 'wordAmount' },
    { name: 'Langue', uid: 'language' },
    { name: 'Joueurs', uid: 'players' },
  ] : [
    { name: 'Victoire', uid: 'hasWon' },
    { name: 'Mpm', uid: 'mpm' },
    { name: 'Mots', uid: 'wordAmount' },
    { name: 'Langue', uid: 'language' },
    { name: 'Joueurs', uid: 'players' },
    { name: 'Date', uid: 'date' },
  ];

  const topScore = topValue(selfData?.self.scores.filter(({ type }: any) => type === Game.MULTI), 'mpm');
  const date = new Date(details.lastActivity);
  const gamesToTableData = games
    .map((game: any, index) => ({
      hasWon: game.winner === details.nickname ? 'true' : 'false',
      mpm: game.players.find(({ name }: { name: string}) => name === details.nickname)?.score.mpm,
      language: game.language,
      wordAmount: game.word_amount,
      players: game.player_length,
      date: formatDate(game.createdAt),
      key: index,
    }));
  return (
    <>
      <div
        style={{
          display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap',
        }}
        className='flex'
      >
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          Parties jouées
          <Text>{games.length}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          Victoires
          <Text>
            {games.filter(({ winner }: any) => winner === selfData?.self.nickname).length}
          </Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          Meilleur mpm
          <Text>{topScore}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          {isMediumScreen ? 'Dern. activité' : 'Dernière activité'}
          <Text>{formatDate(date, 'short')}</Text>
        </Card>
      </div>
      <div>
        <Table
          shadow={false}
          aria-label="Example table with dynamic content & infinity pagination"
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
            items={gamesToTableData}
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

export default PlayerDetailsMulti;

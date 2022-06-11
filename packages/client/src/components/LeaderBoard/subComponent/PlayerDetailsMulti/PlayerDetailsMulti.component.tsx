import {
  formatDate, topValue,
} from '@aqac/utils';
import {
  Card, Table, Text,
} from '@nextui-org/react';
import React from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { PlayerDetailsMultiProps } from './PlayerDetailsMulti.props';

function PlayerDetailsMulti({ games, details }: PlayerDetailsMultiProps) {
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

  const scores = games.map((game: any) => game?.players
    .find((player: any) => player.name === details.nickname).score);
  const date = new Date(details.last_activity);
  const gamesToTableData = games
    .map((game: any, index) => ({
      hasWon: game.winner === details.nickname ? 'true' : 'false',
      mpm: game.players.find(({ name }: { name: string }) => name === details.nickname)?.score.mpm,
      language: game.language,
      wordAmount: game.word_amount,
      players: game.player_length,
      date: formatDate(game.created_at),
      key: index,
      created_at: game.created_at,
    }))
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap',
      }}
      >
        <Card style={{
          width: '12rem', display: 'inline-block', margin: `1rem 1rem 0 ${isMediumScreen ? 0 : 1}rem`, height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ textAlign: 'center' }}>Parties jouées</Text>
          <Text style={{ textAlign: 'center' }}>{games.length}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ textAlign: 'center' }}>Victoires</Text>
          <Text style={{ textAlign: 'center' }}>
            {games.filter(({ winner }: any) => winner === details.nickname).length}
          </Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ textAlign: 'center' }}>Meilleur mpm</Text>
          <Text style={{ textAlign: 'center' }}>{topValue(scores, 'mpm')}</Text>
        </Card>
        <Card style={{
          width: '12rem', display: 'inline-block', margin: '1rem 1rem 0 0', height: '4.5rem', flexBasis: isMediumScreen ? '45%' : '20%',
        }}
        >
          <Text style={{ textAlign: 'center' }}>{isMediumScreen ? 'Dern. activité' : 'Dernière activité'}</Text>
          <Text style={{ textAlign: 'center' }}>{formatDate(date, 'short')}</Text>
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

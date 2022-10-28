import {
  formatDate, topValue,
} from '@sqrib/utils';
import React from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Spacer from '../../../../UI/Spacer/Spacer.component';
import Table from '../../../../UI/Table/Table.component';
import { useColumns } from '../../useColumns.hook';
import { PlayerDetailsMultiProps } from './PlayerDetailsMulti.props';

function PlayerDetailsMulti({ games, details }: PlayerDetailsMultiProps) {
  const { isMediumScreen } = useWindowSize();

  const scores = games.map((game: any) => game?.players
    .find((player: any) => player.name === details.nickname).score);
  const lastActivity = new Date(details.last_activity);
  const gamesToTableData = games
    .map((game: any, index) => ({
      hasWon: game.winner === details.nickname ? 'true' : 'false',
      mpm: game.players.find(({ name }: { name: string }) => name === details.nickname)?.score.mpm,
      language: game.language,
      precision: game.players
        .find(({ name }: { name: string }) => name === details.nickname)?.score.precision,
      players: game.player_length,
      date: formatDate(game.created_at),
      key: index,
      created_at: game.created_at,
    }))
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const { multiplayerDetails } = useColumns();
  return (
    <>
      <div style={{ display: 'flex' }}>
        <p style={{ fontWeight: 600, margin: 0 }}>
          Parties jouées:
          {' '}
          <span style={{ fontWeight: 800 }}>{scores.length || 0}</span>
        </p>
        <Spacer w="10" />
        <p style={{ fontWeight: 600, margin: 0 }}>
          Meilleur mpm :
          {' '}
          <span style={{ fontWeight: 800 }}>{topValue(scores, 'mpm')}</span>
        </p>
        <Spacer w="10" />
        <p style={{ fontWeight: 600, margin: 0 }}>
          Dernière activitée :
          {' '}
          <span style={{ fontWeight: 800 }}>{formatDate(lastActivity)}</span>
        </p>
      </div>
      <Table
        dataSource={gamesToTableData}
        columns={multiplayerDetails()}
      />
    </>
  );
}

export default PlayerDetailsMulti;

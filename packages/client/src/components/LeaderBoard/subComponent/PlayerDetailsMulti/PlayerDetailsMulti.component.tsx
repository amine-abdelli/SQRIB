import { formatDate, Game } from '@sqrib/utils';
import React from 'react';
import Table from '../../../../UI/Table/Table.component';
import { useColumns } from '../../useColumns.hook';
import DetailsHeader from '../DetailsHeader/DetailsHeader.component';
import { PlayerDetailsMultiProps } from './PlayerDetailsMulti.props';

function PlayerDetailsMulti({ games, details }: PlayerDetailsMultiProps) {
  const scores = games.map((game: any) => game?.players
    .find((player: any) => player.name === details.nickname).score);

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
      <DetailsHeader
        scores={scores}
        games={games}
        lastActivity={details?.last_activity}
        type={Game.MULTI}
        details={details}
      />
      <Table
        dataSource={gamesToTableData}
        columns={multiplayerDetails()}
        emptyMessage="Pas de données multijoueurs pour ce joueur"
        pagination={5}
      />
    </>
  );
}

export default PlayerDetailsMulti;

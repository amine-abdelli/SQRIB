/* eslint-disable max-len */
import {
  formatDate, Game, ScoreType,
} from '@sqrib/utils';
import React from 'react';
import Table from '../../../../UI/Table/Table.component';
import { useColumns } from '../../useColumns.hook';
import DetailsHeader from '../DetailsHeader/DetailsHeader.component';

function PlayerDetailsSolo({ scores, details }: { scores: ScoreType[], details: {
  created_at: string
  nickname: string
  last_activity: string
} }) {
  const { soloDetails } = useColumns();
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
      <DetailsHeader scores={scores} lastActivity={details?.last_activity} type={Game.SOLO} />
      <Table
        columns={soloDetails()}
        dataSource={scoresToTableData}
        emptyMessage="Pas encore de partie solo pour ce joueur"
        pagination={5}
      />
    </>
  );
}

export default PlayerDetailsSolo;

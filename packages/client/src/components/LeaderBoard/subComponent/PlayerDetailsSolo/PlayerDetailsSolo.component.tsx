/* eslint-disable max-len */
import {
  formatDate, ScoreType,
} from '@sqrib/utils';
import React from 'react';
import Table from '../../../../UI/Table/Table.component';
import { useColumns } from '../../useColumns.hook';

function PlayerDetailsSolo({ scores, details }: { scores: ScoreType[], details: any }) {
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
  const { soloDetails } = useColumns();
  console.log('scoresToTableData', scoresToTableData);
  return (
    <Table
      columns={soloDetails()}
      dataSource={scoresToTableData}
    />
  );
}

export default PlayerDetailsSolo;

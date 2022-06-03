/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Loading, Radio, Table, Text,
} from '@nextui-org/react';
import Image from 'next/image';

import {
  formatDateToLeaderboard, languages, Languages,
} from '@aqac/utils';
import { LeaderBoardProps } from './LeaderBoard.props';
import { suffixPosition } from '../../utils/numbers';
import crown_svg from '../../assets/Images/crown-solid.svg';
import star_svg from '../../assets/Images/star-solid.svg';
import { multiColumns, soloColumns } from './columns';

function LeaderBoardTable({ scores, title, winnerBoard }: LeaderBoardProps) {
  const [langKey, setLangKey] = useState(Languages.FR);
  const scoresToTableData = scores && scores?.[langKey]
    ?.filter(({ username }) => username)
    .map((score, index) => ({
      position: index + 1,
      mpm: score.mpm,
      username: score.username,
      precision: score.precision,
      victory: winnerBoard?.[score.username]?.length || 0,
      date: formatDateToLeaderboard(score.createdAt as any),
      key: index,
    }));

  return (
    scores && scoresToTableData ? (
      <div>
        <Text h2 css={{ textAlign: 'center' }}>{title}</Text>
        <Radio.Group
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
          }}
          row
          onChange={(e) => setLangKey(e as Languages)}
          value={langKey}
        >
          {languages.map(({ flag, country }) => (
            <Radio value={country} key={country}>
              <Text>{flag}</Text>
            </Radio>
          ))}
        </Radio.Group>
        {/* SOLO */}
        <Table
          shadow={false}
          aria-label="Example table with dynamic content & infinity pagination"
          css={{ width: '100%' }}
          color="secondary"
        >
          <Table.Header columns={winnerBoard ? multiColumns : soloColumns}>
            {(column) => (
              <Table.Column css={{ textAlign: 'center' }} key={column.uid}>
                {column.name === 'Victoires' ? (
                  <>
                    <Image
                      src={star_svg}
                      alt="Icon of a crown"
                      color='blue'
                      quality={100}
                      layout='fixed'
                      width='10px'
                      height='10px'
                    />
                    {column.name}
                  </>
                ) : column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={scoresToTableData.slice(0, 50)}
          >
            {(item: any) => (
              <Table.Row css={{ textAlign: 'center' }} key={item.name}>
                {(key) => (
                  <Table.Cell>
                    {key === 'position' && item[key] === 1 && (
                      <Image
                        src={crown_svg}
                        alt="Icon of a crown"
                        color='blue'
                        quality={100}
                        layout='fixed'
                        width='32px'
                        height='32px'
                      />
                    )}
                    {key === 'position' && item[key] !== 1 && suffixPosition(item[key]) }
                    {key !== 'position' && key !== 'victory' && item[key]}
                    {key === 'victory' && winnerBoard && (item[key])}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    ) : <Loading />
  );
}

export default LeaderBoardTable;

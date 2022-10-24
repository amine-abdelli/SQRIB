/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Button, Modal, Radio, Table, Text,
} from '@nextui-org/react';
import Image from 'next/image';

import {
  formatDateToLeaderboard, languages, Languages,
} from '@sqrib/utils';
import { Hide, Show } from 'react-iconly';
import { useLazyQuery } from '@apollo/client';
import { USER_GAME_DETAILS_QUERY } from '@sqrib/api';
import { LeaderBoardProps } from './LeaderBoard.props';
import { suffixPosition } from '../../utils/numbers.utils';
import crown_svg from '../../assets/Images/crown-solid.svg';
import star_svg from '../../assets/Images/star-solid.svg';
import { multiColumns, soloColumns } from './columns';
import PlayerDetails from './subComponent/PlayerDetails/PlayerDetails.component';

function LeaderBoardTable({ scores, title, winnerBoard }: LeaderBoardProps) {
  const [fetchUserGameDetails, { data, loading }] = useLazyQuery(USER_GAME_DETAILS_QUERY);
  const [shouldDisplayPlayerDetails, setShouldDisplayPlayerDetails] = useState(false);
  const [langKey, setLangKey] = useState(Languages.FR);
  // Fetch user's data
  const scoresToTableData = scores && scores?.[langKey]
    ?.filter(({ username }) => username)
    .map((score, index) => ({
      userId: score.userId,
      position: index + 1,
      mpm: score.mpm,
      username: score.username,
      precision: score.precision,
      victory: winnerBoard?.[score.username]?.length || 0,
      date: formatDateToLeaderboard(score.created_at as any),
      key: index,
    }));

  function fetchUserGamingData(userId: string) {
    setShouldDisplayPlayerDetails(true);
    fetchUserGameDetails({
      variables: {
        userId,
      },
    });
  }

  return (
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
      <Table
        shadow={false}
        aria-label="Example table with dynamic content & infinity pagination"
        css={{ width: '100%' }}
        color="secondary"
        fixed
        hoverable
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
          items={scoresToTableData?.slice(0, 50) || []}
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
                  {key === 'icon' && (
                  <Button
                    disabled={!item?.userId}
                    light
                    auto
                    onClick={() => fetchUserGamingData(item?.userId)}
                  >
                    {item?.userId
                      ? <Show set="curved" primaryColor="#015ECC" />
                      : (
                        <Hide set="curved" primaryColor="grey" />
                      )}
                  </Button>
                  )}
                  {key === 'position' && item[key] !== 1 && suffixPosition(item[key])}
                  {key !== 'position' && key !== 'victory' && item[key]}
                  {key === 'victory' && winnerBoard && (item[key])}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          color="primary"
          align="center"
          rowsPerPage={4}
        />
      </Table>
      <Modal
        closeButton
        open={shouldDisplayPlayerDetails}
        onClose={() => setShouldDisplayPlayerDetails(false)}
        width="60rem"
        style={{ padding: 0 }}
      >
        <PlayerDetails loading={loading} data={data?.fetchUserGamingDetails} />
      </Modal>
    </div>
  );
}

export default LeaderBoardTable;

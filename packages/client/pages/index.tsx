import { useQuery } from '@apollo/client';
import { GLOBAL_GAME_DATA_QUERY } from '@aqac/api';
import { Text } from '@nextui-org/react';
import _ from 'lodash';
import React from 'react';
import LeaderBoardTable from '../src/components/LeaderBoard/LeaderBoardTable.component';
import { useWindowSize } from '../src/hooks/useWindowSize';

function Home() {
  const { data } = useQuery(GLOBAL_GAME_DATA_QUERY);
  const { isLargeScreen } = useWindowSize();

  const gamesGroupedByWinners = _.groupBy(data?.findGameData.games, 'winner');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <Text css={{ textAlign: 'center' }} h1>Leaderboard</Text>
      <div style={{ display: 'flex', flexDirection: isLargeScreen ? 'column' : 'row', padding: '1rem' }}>
        <LeaderBoardTable
          scores={data?.findGameData.solo}
          title="En mode solo"
        />
        <LeaderBoardTable
          scores={data?.findGameData.multi}
          winnerBoard={gamesGroupedByWinners}
          title="En mode multijoueur"
        />
      </div>
    </div>
  );
}

export default Home;

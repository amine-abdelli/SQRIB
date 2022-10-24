import { Loading, Text } from '@nextui-org/react';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socketConnect, socket, socketDisconnect } from '../services/socket.service';
import LeaderBoardTable from '../src/components/LeaderBoard/LeaderBoardTable.component';
import { useWindowSize } from '../src/hooks/useWindowSize';

function Home() {
  const { isLargeScreen } = useWindowSize();
  const [globalGamesData, setGlobalGamesData] = useState<any>();
  const { current: socketRef } = useRef<Socket>(socket);
  useEffect(() => {
    socketConnect(socketRef);
    socketRef.emit('get-global-game-data');
    return () => socketDisconnect(socketRef);
  }, []);

  useEffect(() => {
    socketRef.on('get-global-game-data', (scores) => {
      setGlobalGamesData(scores);
    });
  }, []);
  const gamesGroupedByWinners = _.groupBy(globalGamesData?.games, 'winner');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <Text css={{ textAlign: 'center' }} h1>Leaderboard</Text>
      {globalGamesData ? (
        <div style={{ display: 'flex', flexDirection: isLargeScreen ? 'column' : 'row', padding: '1rem' }}>
          <LeaderBoardTable
            scores={globalGamesData?.solo}
            title="Top 50 - Solo"
          />
          <LeaderBoardTable
            scores={globalGamesData?.multi}
            winnerBoard={gamesGroupedByWinners}
            title="Top 50 - Multijoueur"
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Home;

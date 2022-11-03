import { Loading } from '@nextui-org/react';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socketConnect, socket, socketDisconnect } from '../services/socket.service';
import LeaderBoardTable from '../src/components/LeaderBoard/LeaderBoardTable.component';
import { useColumns } from '../src/components/LeaderBoard/useColumns.hook';
import { useWindowSize } from '../src/hooks/useWindowSize';

function Home() {
  const { isLargeScreen } = useWindowSize();
  const { soloColumns, multiplayerColumns } = useColumns();
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
  const { isSmallScreen } = useWindowSize();
  return (
    globalGamesData ? (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: isLargeScreen ? 'column' : 'row',
          padding: isSmallScreen ? 0 : '1rem',
        }}
      >
        <LeaderBoardTable
          columns={soloColumns}
          scores={globalGamesData?.solo}
          title="Top 20 - Solo"
          style={{ width: '100%', height: '100%', margin: isSmallScreen ? '10px 0' : '10px' }}
        />
        <LeaderBoardTable
          scores={globalGamesData?.multi}
          columns={multiplayerColumns}
          winnerBoard={gamesGroupedByWinners}
          title="Top 20 - Multijoueur"
          style={{ width: '100%', height: '100%', margin: isSmallScreen ? '10px 0' : '10px' }}
        />
      </div>
    ) : (
      <Loading />
    )
  );
}

export default Home;

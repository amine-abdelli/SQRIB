import { Button } from '@nextui-org/react';
import React from 'react';
import OnGame from '../OnGame/OnGame.component';
import ProgressList from '../ProgressList/ProgressList.component';
import { GameRoomProps } from './GameRoom.props';

function GameRoom({
  roomID, handleLeave, username, game, wordSet, socketRef, isGameEnded,
}: GameRoomProps) {
  return (
    <div>
      <div className='flex justify-between'>
        <h3>{roomID}</h3>
        <Button auto onClick={handleLeave}>Quitter</Button>
      </div>
      {`Bienvenue ${username}`}
      <ProgressList data={game} />
      {socketRef.connected && wordSet && (
      <OnGame
        wordSet={wordSet}
        isGameEnded={isGameEnded}
      />
      )}
    </div>
  );
}

export default GameRoom;

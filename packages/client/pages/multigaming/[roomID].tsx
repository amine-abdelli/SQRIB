import { GameType } from '@aqac/utils';
import { Modal, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { alertService } from '../../services';
import {
  socketConnect, socketDisconnect, socket,
} from '../../services/socket.service';
import CreateModal from '../../src/components/Multigaming/CreateModal/CreateModal.component';
import { defaultGameParameters, GameParametersProps } from '../../src/components/Multigaming/CreateModal/CreateModal.props';
import EnterInput from '../../src/components/Multigaming/EnterInput/EnterInput.component';
import GameRoom from '../../src/components/Multigaming/GameRoom/GameRoom.component';
import VictoryModal from '../../src/components/Multigaming/VictoryModal/VictoryModal.component';
import { MainContext } from '../../src/context/MainContext';
import { useGetSelf } from '../../src/hooks/useGetSelf';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';

function Room() {
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>();
  const [wordSet, setWordSet] = useState<string[] | undefined>();
  const [shouldDisplayFirstCounterModal, setShouldDisplayFirstCounterModal] = useState(false);
  const [counter, setCounter] = useState(5);
  const [gameParameters, setGameParameters] = useState<GameParametersProps>(defaultGameParameters);
  const [winner, setWinner] = useState('');
  const [usernameStoredInLocalStorage] = useLocalStorage('nickname', '');
  const [shouldDisplayUsernameInput, setShouldDisplayUsernameInput] = useState(false);
  const [game, setGame] = useState<GameType>();
  // Make sure the socket.id is well anchored and doesn't change every time we send a "query"
  const { current: socketRef } = useRef<Socket>(socket);
  const { data: selfData } = useGetSelf();
  const userId = selfData?.self.id;
  const { roomID: urlParams } = router.query;
  // Params collected from url ROOT_URL/roomID?create=true
  const decryptedUrlParams = Buffer.from(`${urlParams}`, 'base64').toString('ascii').split('?');
  // Decrypted roomID (uuid)
  const roomID = decryptedUrlParams[0];
  // if create=true, then create a room
  const isHost = Boolean(decryptedUrlParams[1]);
  // reencrypted roomID to be sent via URL for invitation
  const encryptedRoomID = Buffer.from(`${roomID}`).toString('base64');
  const { setWordsStack } = useContext(MainContext);

  /**
   * Si la room existe déjà, faire rentrer le joueur dans la game
   * Sinon ouvrir la modal de création de la room
   * Attendre que l'host lance la game
   * Créer un status staging
   * Si staging === 'true', mener vers la page de création de la room avec tous les autres joueurs
   * Sinon, mener vers la page de jeu
   * Passer l'username en param et à l'arrivé init une nouvel socket avec nouvel id
   * et tout ce qui s'en suit
   * Créer enum pour les routes
   * Authentifier les ids avec une clef secrete isLegit
   *
   * User join-room
   * -> send User list
   */
  useEffect(() => {
    socketConnect(socketRef);
    return () => socketDisconnect(socketRef);
  }, [socketRef]);
  // Global wordStack is set to calculate score details every time a user press enter
  useEffect(() => {
    setWordsStack(wordSet);
  }, [setWordsStack, wordSet]);

  useEffect(() => {
    setUsername(selfData?.self.nickname || usernameStoredInLocalStorage);
  }, [selfData?.self.nickname, username, usernameStoredInLocalStorage]);

  useEffect(() => {
    if (username && roomID && gameParameters) {
      socketRef.emit('join-room', {
        roomID, username, userId, gameParameters, isCreating: isHost,
      });
    }
  }, [username, roomID, gameParameters, socketRef, isHost, userId]);

  /**
   * As soon as the player land on the room page, he either join the room or create it
   * See 'join-room' socket in the socket server http://localhost:4001
   */
  useEffect(() => {
    socketRef.on('join-room', ({ wordSet: wordSetPayload, game: currentGame, isLegit }) => {
      // The room ID is checked on the socket server to make sure it's a legit token
      setWordSet(wordSetPayload);
      setGame(currentGame);
    });
    socketRef.on('greet', ({ playerID, playerName }) => {
      const customMessage = playerID === socketRef.id
        ? 'Vous venez de rejoindre la partie'
        : `${playerName} vient de rejoindre la partie`;
      alertService.success(customMessage, {});
    });
  }, [socketRef, username, roomID, gameParameters]);

  // Keep this order so the roomList is updated with the latest names
  function startGame() {
    socketRef.emit('start-game', { roomID, gameParameters });
    socketRef.emit('room-list');
  }

  useEffect(() => {
    setShouldDisplayUsernameInput(!username);
  }, [selfData?.self.nickname, username]);

  useEffect(() => {
    socketRef.on('start-game', ({ game: currentGame }) => {
      setGame(currentGame);
      setCounter(5);
    });
  }, [socketRef]);

  return (
    <div>
      <h1>
        Salut
        {' '}
        {username}
      </h1>
      <Modal
        open={shouldDisplayUsernameInput}
      >
        <EnterInput
          setUsername={setUsername}
        />
      </Modal>
      <CreateModal
        isVisible={game?.status === 'staging'}
        roomID={encryptedRoomID}
        username={username}
        isHost={isHost}
        gameParameters={gameParameters}
        setGameParameters={setGameParameters}
        game={game}
        startGame={startGame}
        socket={socketRef}
      />
      {username && game && socketRef.connected && (
        <GameRoom
          roomID={roomID}
          game={game}
          isGameEnded={game?.status === 'finished'}
          socketRef={socketRef}
          username={username}
          wordSet={wordSet || []}
          setWordSet={setWordSet}
          setGame={setGame}
          setWinner={setWinner}
          setCounter={setCounter}
          setShouldDisplayFirstCounterModal={setShouldDisplayFirstCounterModal}
        />
      )}
      {game?.status === 'finished' && (
        <VictoryModal
          counter={counter}
          isGameEnded={game?.status === 'finished'}
          winnerNickname={winner}
        />
      )}
      <Modal css={{ padding: '2rem' }} open={shouldDisplayFirstCounterModal}>
        {counter > -1 ? (
          <>
            <Text h3>Prêt?</Text>
            {counter}
          </>
        ) : (
          <Text h3>GO</Text>)}
      </Modal>
    </div>
  );
}

export default Room;

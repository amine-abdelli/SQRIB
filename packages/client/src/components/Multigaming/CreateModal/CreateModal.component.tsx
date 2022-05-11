import {
  Button, Container, Input, Modal, Radio, Spacer, Text,
} from '@nextui-org/react';
import { languages, wordAmount } from '@aqac/utils';
import React, { useEffect } from 'react';
import router from 'next/router';
import { CreateModalProps, defaultGameParameters } from './CreateModal.props';
import { onFormChange } from '../../../utils/form';
import styles from './CreateModal.module.scss';
import GameLink from './GameLink/GameLink.component';

function CreateModal({
  isVisible, roomID, username, isHost, gameParameters, setGameParameters, game,
  startGame,
}: CreateModalProps) {
  const roomName = `[${gameParameters.language.toLocaleUpperCase()}] ${gameParameters.wordAmount} ${gameParameters.private ? 'privé' : 'public'} hosted by ${username}`;
  const invitationUrl = `http://localhost:3000/multigaming/${roomID}`;

  useEffect(() => {
    setGameParameters({
      ...gameParameters,
      name: roomName,
    });
  }, [roomName]);

  return (
    <Modal
      fullScreen
      open={isVisible}
      aria-labelledby="Create room modal"
      onClose={() => {
        setGameParameters(defaultGameParameters);
      }}
    >
      <Text h1>{'En attente d\'autres joueurs'}</Text>
      <Container>
        <div className='flex justify-center'>
          <div className='m20 flex flex-column' style={{ minWidth: '20rem' }}>
            <Text h3 className='text-center'>Créer une partie</Text>
            <Input
              color='primary'
              bordered
              className='w100'
              value={roomName}
              disabled
              aria-labelledby="Room name input"
            />
            <Radio.Group
              disabled={!isHost}
              value={gameParameters.language}
              onChange={(e) => onFormChange(e, 'language', setGameParameters, gameParameters)}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              aria-labelledby="Language picker"
            >
              {languages.map(({ flag, country }) => (
                <Radio value={country} style={{ display: 'inline-block' }} key={country}>
                  <Text>{flag}</Text>
                </Radio>
              ))}
            </Radio.Group>
            <Radio.Group
              disabled={!isHost}
              value={gameParameters.wordAmount}
              onChange={(e) => onFormChange(e, 'wordAmount', setGameParameters, gameParameters)}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              aria-labelledby="Word amount picker"
            >
              {Object.values(wordAmount).map((words) => (
                <Radio value={words} className='inline-block' key={words}>
                  <Text>{words}</Text>
                </Radio>
              ))}
            </Radio.Group>
            <Spacer />
            <Button
              disabled={!isHost}
              animated
              className='w100'
              onClick={() => {
                startGame();
              }}
            >
              Commencer
            </Button>
            <Button
              bordered
              animated
              className='w100'
              onClick={() => {
                setGameParameters(defaultGameParameters);
                router.push('/multigaming');
              }}
            >
              Annuler
            </Button>
          </div>
          <div style={{ width: '20rem', maxWidth: '50%' }} className='m20'>
            <Text h3 className='text-center'>Joueurs</Text>
            <div className={styles.playersWrapper}>
              {game?.clients && Object.values(game?.clients).map((client: any) => (
                username && (
                  <div key={client.id}>
                    <div
                      className={styles.player}
                      style={{ backgroundColor: client.color }}
                    >
                      {client.username}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'inline-block' }}>
          <Text h5 className='text-center'>Invite d&apos;autres joueurs</Text>
          <GameLink url={invitationUrl} />
        </div>
      </Container>
    </Modal>
  );
}

export default CreateModal;

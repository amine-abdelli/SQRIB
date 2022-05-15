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
import { useWindowSize } from '../../../hooks/useWindowSize';

function CreateModal({
  isVisible, roomID, username, isHost, gameParameters, setGameParameters, game,
  startGame,
}: CreateModalProps) {
  const roomName = `[${gameParameters.language.toLocaleUpperCase()}] ${gameParameters.wordAmount} ${gameParameters.private ? 'privé' : 'public'} hosted by ${username}`;
  const invitationUrl = `http://localhost:3000/multigaming/${roomID}`;
  const { isMediumScreen } = useWindowSize();

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
      css={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
      onClose={() => {
        setGameParameters(defaultGameParameters);
      }}
    >
      <Container css={{ padding: '1rem' }}>
        <div className={styles.createModalWrapper} style={{ alignItems: isMediumScreen ? 'center' : '' }}>
          <div
            className='flex align-center flex-column'
            style={{
              minWidth: '20rem', maxWidth: '30rem', display: 'flex',
            }}
          >
            <Text h3 className='text-center' css={{ marginBottom: '1rem' }}>Créer une partie</Text>
            <Input
              color='primary'
              bordered
              css={{ width: '100%' }}
              value={roomName}
              disabled
              aria-labelledby="Room name input"
            />
            <Radio.Group
              disabled={!isHost}
              value={gameParameters.language}
              onChange={(e) => onFormChange(e, 'language', setGameParameters, gameParameters)}
              style={{
                display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between',
              }}
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
              style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',
              }}
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
              onClick={() => startGame()}
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
          {!isMediumScreen && (
          <div style={{ margin: '0 1rem' }}>
            <Text h3 className='text-center'>Joueurs</Text>
            <div className={styles.playersWrapper}>
              {game?.clients && Object.values(game?.clients).map((client: any) => (
                username && (
                <div key={client.id}>
                  <div
                    className={styles.player}
                    style={{ backgroundColor: client.color, fontWeight: 'bold' }}
                  >
                    {client.username}
                  </div>
                </div>
                )
              ))}
            </div>
          </div>
          )}
        </div>
        <div style={{ display: 'inline-block', width: '20rem', marginTop: '1rem' }}>
          <Text h5 className='text-center'>Invite d&apos;autres joueurs</Text>
          <GameLink url={invitationUrl} />
        </div>
      </Container>
    </Modal>
  );
}

export default CreateModal;

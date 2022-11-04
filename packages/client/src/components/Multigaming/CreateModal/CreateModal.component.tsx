import { Languages, languages, wordAmount } from '@sqrib/utils';
import React, { useEffect } from 'react';
import router from 'next/router';
import { CreateModalProps, defaultGameParameters } from './CreateModal.props';
import styles from './CreateModal.module.scss';
import GameLink from './GameLink/GameLink.component';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { socketDisconnect } from '../../../../services/socket.service';
import { Routes } from '../../../utils/enums';
import Modal from '../../../UI/Modal/Modal.component';
import Button from '../../../UI/Button/Button.component';
import Input from '../../../UI/Input/Input.component';
import Card from '../../../UI/Card/Card.component';
import Spacer from '../../../UI/Spacer/Spacer.component';
import Select from '../../../UI/Select/Select.component';

function CreateModal({
  isVisible, roomID, username, isHost: isCreator, gameParameters, setGameParameters, game,
  startGame, socket,
}: CreateModalProps) {
  const roomName = `[${gameParameters.language.toLocaleUpperCase()}] ${gameParameters.wordAmount} ${gameParameters.private ? 'privé' : 'public'} hosted by ${username}`;
  const ROOT = process.env.FRONTEND_URL;
  const invitationUrl = `${ROOT}${Routes.MULTIGAMING}/${roomID}`;
  const { isMediumScreen } = useWindowSize();

  useEffect(() => {
    setGameParameters({
      ...gameParameters,
      name: roomName,
    });
  }, [roomName]);

  const host = game && Object.values(game?.clients).find((client: any) => client.host);
  const isHost = host?.id === socket.id || host?.username === username;
  return (
    <Modal
      isOpen={isVisible}
      sqribBackground
      closeable
      darkCross
      fullScreen
      setIsOpen={() => {
        setGameParameters(defaultGameParameters);
        socketDisconnect(socket);
        router.push('/multigaming');
      }}
    >
      <Modal.Body style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column',
      }}
      >
        <div className={styles.createModalWrapper} style={{ display: 'flex', alignItems: isMediumScreen ? 'center' : '' }}>
          <Card
            shadowed
            width='350'
          >
            <h3 className='text-center' style={{ marginBottom: '1rem' }}>
              {(isHost || isCreator)
                ? 'Créer une partie'
                : 'En attente que l\'hôte lance la partie'}
            </h3>
            <Input
              value={gameParameters?.name}
              disabled
              fullWidth
            />
            <Spacer h="10" />
            <div style={{ display: 'flex' }}>
              <div style={{ flexBasis: '50%' }} className='flex flex-column'>
                <span className='bold'>Choix de la langue</span>
                <Select
                  data={languages.map(({ flag, country }) => ({ label: flag, value: country }))}
                  value={gameParameters?.language}
                  onChange={(event: Languages) => setGameParameters(
                    { ...gameParameters, language: event },
                  )}
                />
              </div>
              <Spacer h="20" />
              <div className='flex flex-column'>
                <span className='bold'>Nombre de mots</span>
                <Select
                  data={Object.values(wordAmount)
                    .map((amount) => ({ label: amount, value: amount }))}
                  value={gameParameters?.wordAmount}
                  onChange={(event: number) => setGameParameters(
                    { ...gameParameters, wordAmount: event },
                  )}
                />
              </div>
            </div>
            <Spacer h="20" />
            <Button
              disabled={!isHost && !isCreator}
              onClick={() => startGame()}
              text="Commencer"
            />
            <Button
              secondary
              onClick={() => {
                setGameParameters(defaultGameParameters);
                socketDisconnect(socket);
                router.push('/multigaming');
              }}
              text="Annuler"
            />
          </Card>
          <div style={{ margin: '0 1rem' }}>
            <h3 className='text-center' style={{ color: 'white' }}>Joueurs</h3>
            <div className={styles.playersWrapper}>
              {game?.clients && Object.values(game?.clients).map((client: any) => (
                username && (
                <div key={client.id}>
                  <div
                    className={styles.player}
                    style={{ backgroundColor: client.color, fontWeight: 'bold', boxShadow: '4px 4px 0 black' }}
                  >
                    {client.username}
                  </div>
                </div>
                )
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'inline-block', width: '20rem', marginTop: '1rem' }}>
          <h5 className={styles.inviteTitle}>Partage ce lien pour inviter d&apos;autres joueurs</h5>
          <GameLink url={invitationUrl} />
        </div>
      </Modal.Body>

    </Modal>
  );
}

export default CreateModal;

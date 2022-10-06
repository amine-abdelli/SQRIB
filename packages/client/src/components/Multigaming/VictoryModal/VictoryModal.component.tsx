import { createPodium } from '@sqrib/utils';
import { Modal, Spacer } from '@nextui-org/react';
import React from 'react';
import UserCard from './SubComponent/UserCard.component';
import { VictoryModalProps } from './VictoryModal.props';

function VictoryModal({
  isGameEnded, counter, game,
}: VictoryModalProps) {
  const { podium: initialPodium } = createPodium(game);
  // exclude players in staging from podium
  const podium = initialPodium
    .filter((player) => player.status !== 'staging')
    .slice(0, 3);
  return (
    <Modal
      open={isGameEnded}
      width='40rem'
      css={{ padding: '2rem' }}
    >
      <h5>{`Une nouvelle partie va commencer dans quelques instants... ${counter < 0 ? 'GO' : counter}`}</h5>
      <Spacer y={2} />
      <div style={{
        display: 'flex', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center',
      }}
      >
        {
          podium.length === 3 ? (
            <>
              {podium[1] && (
              <UserCard
                userData={podium[1]}
                position={1}
              />
              )}
              {podium[0] && (
              <UserCard
                userData={podium[0]}
                position={0}
              />
              )}
              {podium[2] && (
              <UserCard
                userData={podium[2]}
                position={2}
              />
              )}
            </>
          ) : (
            <>
              {podium[0] && (
              <UserCard
                userData={podium[0]}
                position={0}
              />
              )}
              {podium[1] && (
              <UserCard
                userData={podium[1]}
                position={1}
              />
              )}
            </>
          )
        }
      </div>
    </Modal>
  );
}

export default VictoryModal;

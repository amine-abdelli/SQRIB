import { Loading } from '@nextui-org/react';
import { createPodium, GameStatus } from '@sqrib/utils';
import React, { useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal.component';
import Spacer from '../../../UI/Spacer/Spacer.component';
import Table from '../../../UI/Table/Table.component';
import { useColumns } from '../../LeaderBoard/useColumns.hook';
import { VictoryModalProps } from './VictoryModal.props';

function VictoryModal({
  counter, game, socketRef,
}: VictoryModalProps) {
  const [finalScore, setFinalScore] = useState();
  const isGameEnded = game.status === 'finished';
  useEffect(() => {
    socketRef.on('podium-data', ({ game: podiumData }: any) => {
      setFinalScore(podiumData);
    });
    return () => {
      socketRef.off('podium-data');
    };
  }, [socketRef]);
  const { victoryModalColumns } = useColumns();
  if (!finalScore) return <Loading />;
  const { podium: initialPodium } = createPodium(finalScore);
  // exclude players in staging from podium
  const podium = initialPodium
    .filter((player) => player.status !== GameStatus.STAGING);
  return (
    <Modal isOpen={isGameEnded}>
      <Modal.Body>
        <h1 className='text-center'>PODIUM</h1>
        <Spacer h="2" />
        <div style={{
          display: 'flex', justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center',
        }}
        >
          <Table
            dataSource={podium}
            columns={victoryModalColumns() as any}
          />
        </div>
        <Spacer h="10" />
        <h5>{`Une nouvelle partie va commencer dans quelques instants... ${counter < 0 ? 'GO' : counter}`}</h5>
      </Modal.Body>
    </Modal>
  );
}

export default VictoryModal;

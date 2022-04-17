import { Modal } from '@nextui-org/react';
import React from 'react';
import { VictoryModalProps } from './VictoryModal.props';

function VictoryModal({ isGameEnded, winnerNickname }: VictoryModalProps) {
  return (
    <Modal
      open={isGameEnded}
    >
      <h3>{`${winnerNickname} remporte la victoire !`}</h3>
      <h5>Une nouvelle partie va commencer dans quelques instants...</h5>
    </Modal>
  );
}

export default VictoryModal;

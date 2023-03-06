import { Loading } from '@nextui-org/react';
import React from 'react';
import Avatar from '../../../../UI/Avatar/Avatar.component';
import Button from '../../../../UI/Button/Button.component';
import Modal from '../../../../UI/Modal/Modal.component';
import Spacer from '../../../../UI/Spacer/Spacer.component';
// import { useWindowSize } from '../../../../hooks/useWindowSize';
import PlayerDetailsMulti from '../PlayerDetailsMulti/PlayerDetailsMulti.component';
import PlayerDetailsSolo from '../PlayerDetailsSolo/PlayerDetailsSolo.component';
import { PlayerDetailsProps } from './PlayerDetails.props';

function PlayerDetailsModal({
  data, loading, isOpen, setIsOpen,
}: PlayerDetailsProps) {
  const [stepPosition, setStepPosition] = React.useState(0);
  // const { isMediumScreen } = useWindowSize();
  if (loading) return <Loading />;
  // const lastActivity = data?.details.last_activity;
  // A player is considered as active if he has done some actions in the last 10 minutes
  // const isActive = new Date(lastActivity).getTime() > (new Date().getTime() - 10 * 60 * 1000);
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeable
      darkCross
    >
      <Modal.Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar username={data?.details?.nickname} />
          <Spacer w="10" />
          {/* <h2 style={{ margin: 0, padding: 0 }}>{data?.details?.nickname}</h2> */}
          <h2 style={{ margin: 0, padding: 0, fontWeight: 800 }}>Narstonerz</h2>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-between" />
        {stepPosition === 1 && !loading && data?.details && (
        <PlayerDetailsMulti games={data?.multi} details={data?.details} />)}
        {stepPosition === 0 && !loading && data?.details && (
        <PlayerDetailsSolo scores={data?.solo} details={data?.details} />)}
      </Modal.Body>
      <Modal.Footer>
        <div className='flex'>
          <Button text="Solo" secondary={stepPosition === 1} onClick={() => setStepPosition(0)} stretch />
          <Spacer w="15" />
          <Button text="Multijoueur" secondary={stepPosition === 0} onClick={() => setStepPosition(1)} stretch />
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PlayerDetailsModal;

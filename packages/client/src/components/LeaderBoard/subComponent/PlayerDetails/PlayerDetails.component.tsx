import {
  Avatar,
  Card, Loading, Text,
} from '@nextui-org/react';
import React from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import PlayerDetailsMulti from '../PlayerDetailsMulti/PlayerDetailsMulti.component';
import PlayerDetailsSolo from '../PlayerDetailsSolo/PlayerDetailsSolo.component';
import { PlayerDetailsProps } from './PlayerDetails.props';

function PlayerDetails({ data, loading }: PlayerDetailsProps) {
  const [stepPosition, setStepPosition] = React.useState(0);
  const { isMediumScreen } = useWindowSize();
  if (loading) return <Loading />;
  const lastActivity = data?.details.last_activity;
  // A player is considered as active if he has done some actions in the last 10 minutes
  const isActive = new Date(lastActivity).getTime() > (new Date().getTime() - 10 * 60 * 1000);
  return (
    <Card style={{ width: '100%' }}>
      <div className="flex justify-between" style={{ flexDirection: isMediumScreen ? 'column' : 'row' }}>
        <div style={{ paddingLeft: '0.85rem' }} className='flex align-center'>
          <Avatar style={{ marginRight: '0.5rem' }} className='pointer ml5' size='lg' squared src='https://picsum.photos/200' color={isActive ? 'success' : 'error'} bordered />
          <Text h1>{data?.details?.nickname}</Text>
        </div>
        <div className='flex '>
          <Text style={{ cursor: 'pointer', color: stepPosition !== 0 ? 'grey' : '' }} onClick={() => setStepPosition(0)} h3 className='m1r'>Mode solo</Text>
          {' '}
          <Text style={{ cursor: 'pointer', color: stepPosition !== 1 ? 'grey' : '' }} onClick={() => setStepPosition(1)} h3 className='m1r'>Multijoueur</Text>
        </div>
      </div>
      {stepPosition === 0 && <PlayerDetailsSolo scores={data?.solo} details={data?.details} />}
      {stepPosition === 1 && <PlayerDetailsMulti games={data?.multi} details={data?.details} />}
    </Card>
  );
}

export default PlayerDetails;

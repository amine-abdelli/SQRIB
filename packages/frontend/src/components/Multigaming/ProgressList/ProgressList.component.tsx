import { ClientType } from '@sqrib/utils';
import React from 'react';
import { Socket } from 'socket.io-client';
import ProgressBar from '../../ProgressBar/ProgressBar.component';
import { ProgressListProps } from './ProgressList.props';

function ProgressList({ data, socketRef }: { data: ClientType[], socketRef: Socket }) {
  const self = data?.find(({ id }) => id === socketRef.id);
  return (
    <div style={{ marginLeft: '1rem' }}>
      {data?.map(({
        wordIndex: index, username: nickname, color, wordAmount, id,
      }: ProgressListProps, i: number) => {
        const progress = ((index || 0) / (wordAmount || 60)) * 100;
        return (nickname && (
        <div key={id} style={{ width: '18rem', flexDirection: 'column' }} className='flex'>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <p style={{
              textAlign: 'start', fontWeight: 800, fontSize: '24px', margin: 0, padding: 0,
            }}
            >
              {nickname}
            </p>
          </div>
          <ProgressBar
            key={nickname}
            color={color}
            completed={progress}
            style={{ width: '100%' }}
            focus={self?.id === id}
          />
        </div>
        ));
      })}
    </div>
  );
}

export default ProgressList;

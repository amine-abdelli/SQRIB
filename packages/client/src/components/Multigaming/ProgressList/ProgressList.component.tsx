import { ClientType } from '@aqac/utils';
import React from 'react';
import { order } from '../../../utils/numbers';
import ProgressBar from '../../ProgressBar/ProgressBar.component';
import { ProgressListProps } from './ProgressList.props';

function ProgressList({ data }: { data: ClientType[] }) {
  return (
    <div>
      {data?.map(({
        wordIndex: index, username: nickname, color, wordAmount, id,
      }: ProgressListProps, i: number) => {
        const progress = (index / wordAmount) * 100;
        return (nickname && (
          <div key={id} className='flex align-center'>
            <span style={{ width: '10%' }}>
              {order(i + 1)}
            </span>
            <div style={{ width: '20%' }}>
              <span style={{ textAlign: 'start' }}>
                {nickname}
              </span>
            </div>
            <ProgressBar
              key={nickname}
              color={color}
              completed={progress}
              style={{ width: '70%' }}
            />
          </div>
        ));
      })}
    </div>
  );
}

export default ProgressList;

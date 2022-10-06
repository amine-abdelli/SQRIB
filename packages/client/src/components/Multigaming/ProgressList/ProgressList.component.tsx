import { ClientType } from '@sqrib/utils';
import React from 'react';
import { suffixPosition } from '../../../utils/numbers.utils';
import ProgressBar from '../../ProgressBar/ProgressBar.component';
import { ProgressListProps } from './ProgressList.props';

function ProgressList({ data }: { data: ClientType[] }) {
  return (
    <div>
      {data?.map(({
        wordIndex: index, username: nickname, color, wordAmount, id,
      }: ProgressListProps, i: number) => {
        const progress = ((index || 0) / (wordAmount || 60)) * 100;
        return (nickname && (
          <div key={id} className='flex align-center'>
            <span style={{ width: '10%' }}>
              {suffixPosition(i + 1)}
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

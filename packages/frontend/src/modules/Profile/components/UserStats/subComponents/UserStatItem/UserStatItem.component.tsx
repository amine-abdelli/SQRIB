import React from 'react';
import { Text } from '../../../../../../components/Text/Text.component';
import './UserStatItem.style.scss';
import { COLORS } from '../../../../../../theme/colors';
import { Spinner } from '../../../../../../components';

interface UserStatItemProps {
  label: string;
  value: string | number;
  small?: boolean;
  best?: boolean;
  isLoading?: boolean;
}

const UserStatItem = ({ label, value, isLoading, best }: UserStatItemProps) => {
  return (
    <div className='user-stat-item' style={{ background: best ? COLORS.LIGHT_GREEN : '' }}>
      {isLoading ?
        <Spinner size={60} />
        : (<>
          <Text bold fira>{label}</Text>
          <Text h1 fira>{value}</Text>
        </>
        )
      }
    </div>
  )
}

export { UserStatItem };
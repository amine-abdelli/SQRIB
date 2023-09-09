import React from 'react';
import { Text } from '../../../../../../components/Text/Text.component';
import './UserStatItem.style.scss';
import { COLORS } from '../../../../../../theme/colors';
import { Loader } from '../../../../../../components/Loader/Loader.component';

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
      <Text bold fira>{label}</Text>
      {isLoading ? <Loader /> : <Text h1 fira>{value}</Text>}
    </div>
  )
}

export { UserStatItem };
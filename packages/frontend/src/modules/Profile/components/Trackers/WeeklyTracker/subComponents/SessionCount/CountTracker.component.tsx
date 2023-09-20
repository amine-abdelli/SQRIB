import React from 'react'
import { Text } from '../../../../../../../components/Text/Text.component';

interface SessionCountProps {
  count: number;
  label: string;
}

const CountTracker: React.FC<SessionCountProps> = ({ count, label }) => {
  return (
    <div className='count-tracker'>
      <Text h1 bold fira>{count}</Text>
      <Text fira>{label}</Text>
    </div>
  )
}

export { CountTracker };
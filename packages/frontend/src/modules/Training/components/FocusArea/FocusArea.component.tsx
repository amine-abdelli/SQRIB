import React from 'react';
import { Key } from '../../../../components/KeyBoard/subComponent/Key.component';
import { countOccurrences } from '../../../../utils';
import { Badge } from '../../../../components/Badge/Badge.component';
import './FocusArea.style.scss';

interface FocusAreaProps {
  misspellings: string[]
}

const FocusArea = ({ misspellings }: FocusAreaProps) => {
  const occurrencesOfMisspellings = countOccurrences(misspellings)
  return (
    <div className='focus-area'>
      {Object.entries(occurrencesOfMisspellings).map(([letter, count]) => {
        return (
          <Badge key={letter} count={count as number}>
            <Key letter={letter} misspellings={misspellings} enable keyPressed='' showCase />
          </Badge>
        )
      })}
    </div>
  )
}

export { FocusArea }
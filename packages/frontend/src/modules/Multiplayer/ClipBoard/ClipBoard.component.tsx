import React from 'react'
import toast from 'react-hot-toast'

import { Input } from '../../Auth/components';
import { ChevronDownCircle, Document } from 'react-iconly';
import { COLORS } from '../../../theme/colors';

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success('Copied in clipboard');
}

function onCopyButtonClick(setIsClicked: (isClicked: boolean) => void, url: string) {
  copyToClipboard(url);
  setIsClicked(true);
  setTimeout(() => {
    setIsClicked(false);
  }, 4000);
}

export function ClipBoard({ url }: { url: string }) {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <div>
      <div
        onClick={() => onCopyButtonClick(setIsClicked, url)}
        className='flex align-center'
      >
        <Input
          name=''
          fullWidth
          style={{ cursor: 'pointer' }}
          value={url}
          aria-labelledby="Game url link to share"
          rightContent={(
            <span className='clipboard'>
              {isClicked ? <ChevronDownCircle style={{ color: 'green' }} /> : <Document style={{ color: COLORS.GOLD }} />}
            </span>
          )}
        />

      </div>
    </div>
  );
}


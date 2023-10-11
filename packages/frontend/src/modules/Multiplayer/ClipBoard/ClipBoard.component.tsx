import React from 'react'
import toast from 'react-hot-toast'

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
    <div
      onClick={() => onCopyButtonClick(setIsClicked, url)}
      className='flex align-center'
      style={{ cursor: 'pointer', background: 'white', padding: '0.5rem', borderRadius: '5px', overflow: 'hidden', display: 'flex', alignItems: 'center', border: '3px solid black', width: '24.5rem' }}
    >
      <input className='fira' style={{ width: '100%', border: 'none', cursor: 'pointer' }} readOnly value={url} />
      <span className='clipboard'>
        {isClicked ? <ChevronDownCircle style={{ color: 'green' }} /> : <Document style={{ color: COLORS.GOLD }} />}
      </span>
    </div>
  );
}


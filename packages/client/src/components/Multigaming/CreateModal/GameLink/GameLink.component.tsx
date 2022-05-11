import { Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { ChevronDownCircle } from 'react-iconly';
import styles from './GameLink.module.scss';

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function onCopyButtonClick(setIsClicked: (isClicked: boolean) => void, url: string) {
  copyToClipboard(url);
  setIsClicked(true);
  setTimeout(() => {
    setIsClicked(false);
  }, 4000);
}

function GameLink({ url }: {url: string}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <div className='flex align-center'>
        <Input
          css={{ width: '100%' }}
          contentRightStyling={false}
          value={url}
          aria-labelledby="Game url link to share"
          contentRight={(
            <span
              onClick={() => onCopyButtonClick(setIsClicked, url)}
              className={styles.copyButton}
            >
              {isClicked ? <ChevronDownCircle style={{ color: 'green' }} /> : 'copier'}
            </span>
      )}
        />
      </div>
    </div>
  );
}

export default GameLink;

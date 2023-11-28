import React, { useState } from 'react';
import { ChevronDownCircle, Document } from 'react-iconly';
import { alertService } from '../../../../../services';
import { theme } from '../../../../../styles/theme';
import Input from '../../../../UI/Input/Input.component';
import styles from './GameLink.module.scss';

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  alertService.success('Lien copié dans clipboard', { keepAfterRouteChange: false });
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
      <div
        onClick={() => onCopyButtonClick(setIsClicked, url)}
        className='flex align-center'
      >
        <Input
          fullWidth
          style={{ cursor: 'pointer' }}
          value={url}
          aria-labelledby="Game url link to share"
          rightContent={(
            <span
              onClick={() => onCopyButtonClick(setIsClicked, url)}
              className={styles.copyButton}
            >
              {isClicked ? <ChevronDownCircle style={{ color: 'green' }} /> : <Document style={{ color: theme.primary }} />}
            </span>
          )}
        />

      </div>
    </div>
  );
}

export default GameLink;

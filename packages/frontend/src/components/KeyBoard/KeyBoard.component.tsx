import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import './KeyBoard.style.scss';
import { Key } from './subComponent/Key.component';

function KeyBoard({ enable, misspellings, isFocused: isInputFocused }: { enable: boolean, misspellings: string[], isFocused?: boolean }) {
  const [isMajPressed, setIsMajPressed] = useState<boolean>(false);
  // TODO add to settings
  const [isQwerty] = useState<boolean>(false);
  const [keyPressed, setKeyPressed] = useState<string>('');
  const keyBoardKeys: string[] = keyBoardLayout[isQwerty ? KeyBoardEnum.DEFAULT_QWERTY : KeyBoardEnum.DEFAULT_AZERTY][isMajPressed ? KeyBoardEnum.MAJ : KeyBoardEnum.NORMAL];

  useEffect(() => {
    if (enable && isInputFocused) {
      function handleKeyDown(event: KeyboardEvent) {
        console.log('event : ', event.code)
        if (event.key === 'Shift') {
          setIsMajPressed(true)
        }
        // Prevent user from pasting text
        if (event.ctrlKey && event.key === "v") {
          event.preventDefault();
        }
        setKeyPressed(event.key);

        if (event.key === ' ') {
          setKeyPressed('Space');
        }
      }
      function handleKeyUp() {
        setIsMajPressed(false)
        setKeyPressed('');
      }
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [isInputFocused]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='keyBoardWrapper'>
        {keyBoardKeys.map((row: string, i: number) => (
          <div key={row[i]}>
            <div className='keyBoardRow' style={{ cursor: enable ? '' : 'not-allowed' }}>
              {row?.split(' ').map((key: string) => {
                const isKeyPressedAndEnable: boolean = keyPressed === key && enable;
                return (
                  <Key
                    letter={key}
                    key={key}
                    enable={enable}
                    isKeyPressedAndEnable={isKeyPressedAndEnable}
                    keyPressed={keyPressed}
                    misspellings={misspellings}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { KeyBoard };

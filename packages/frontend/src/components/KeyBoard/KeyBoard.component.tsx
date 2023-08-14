import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import './KeyBoard.style.scss';
import { Key } from './subComponent/Key.component';

function KeyBoard({ enable, misspellings, setInput, input }: { enable: boolean, misspellings: string[], setInput: Function, input: string }) {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const keyBoardKeys: string[] = keyBoardLayout[KeyBoardEnum.DEFAULT_QWERTY];

  useEffect(() => {
    if (enable) {
      function handleKeyDown(event: KeyboardEvent) {
        // Prevent user from pasting text
        if (event.ctrlKey && event.key === "v") {
          event.preventDefault();
        }
        setKeyPressed(event.key);
      }
      function handleKeyUp() {
        setKeyPressed('');
      }
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  return (
    <div className='keyBoardWrapper'>
      {keyBoardKeys.map((row: string, i: number) => (
        <div key={row[i]}>
          <div className='keyBoardRow' style={{ cursor: enable ? '' : 'not-allowed' }}>
            {row?.split(' ').map((key: string) => {
              const isKeyPressedAndEnable: boolean = keyPressed === key && enable;
              return (
                <Key
                  letter={key}
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
  );
}

export { KeyBoard };

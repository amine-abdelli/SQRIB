import React, { useEffect, useState } from 'react';
// import { alphabet } from '@sqrib/utils';
import { useRouter } from 'next/router';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import styles from './KeyBoard.module.scss';
import { translateKeyBoardCode } from './helpers/KeyBoard.helper';
import { Routes } from '../../utils/enums';
import { useLazyGetSelf } from '../../hooks/useLazyGetSelf';
import { theme } from '../../../styles/theme';

function KeyBoard({ enable }: { enable: boolean }) {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const Router = useRouter();
  const keyBoardKeys: string[] = keyBoardLayout[KeyBoardEnum.DEFAULT_AZERTY];
  const isDidacticiel = Router.pathname === Routes.DIDACTICIEL;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setKeyPressed(e.key);
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
  }, []);

  const { querySelf } = useLazyGetSelf();
  useEffect(() => {
    if (isDidacticiel) {
      querySelf();
    }
  }, []);
  // Highlight keys to focus in didacticiel mode
  // const highlightedKeys = alphabet.filter((_, i) => i <= 7);

  function expressKeyStyleProperty(e: string, pressedKey: string) {
    if (e === 'Escape') {
      return theme.tertiary;
    }
    if (pressedKey === e) {
      return theme.primary;
    }
    return theme.tertiary;
  }
  return (
    <div style={{ border: 'none' }} className={styles.keyBoardWrapper}>
      {keyBoardKeys.map((row: string, i: number) => (
        <div key={row[i]}>
          <div className={styles.keyBoardRow} style={{ cursor: enable ? 'pointer' : 'not-allowed' }}>
            {row?.split(' ').map((e: string) => {
              const isKeyPressedAndEnable: boolean = keyPressed === e && enable;
              return (
                <span
                  key={e}
                  className={styles.key}
                  style={{
                    borderColor: theme?.outline,
                    transform: isKeyPressedAndEnable ? 'scale(0.95)' : 'scale(0.99)',
                    backgroundColor: enable ? expressKeyStyleProperty(e, keyPressed) : 'grey',
                    color: theme.outline,
                    border: '3px solid black',
                    fontWeight: 800,
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins',
                  }}
                >
                  {translateKeyBoardCode(e)}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KeyBoard;

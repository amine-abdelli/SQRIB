import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { spreadLetters } from '../../utils/displayer.utils';
import Cursor from './Cursor/Cursor.component';
import styles from './DisplayerHeader.module.scss';

function DisplayerHeader({ children }: any) {
  const {
    letterWidth,
    horizontalPosition,
    userInput,
    wordIndex,
    setHorizontalPosition,
    wordsStack,
    setLetterWidth,
  } = useContext(MainContext);
  // ! a position absolute is fucking up the moving cursor
  return (
    <div className={styles.displayerHeaderWrapper}>
      <p
        className={styles.displayerHeader}
      >
        {spreadLetters(
          wordsStack[wordIndex],
          userInput,
          setHorizontalPosition,
          setLetterWidth,
        ) || <p style={{ color: 'transparent' }}>amine le bg du 59</p>}
      </p>
      {horizontalPosition && letterWidth ? (
        <Cursor
          horizontalPosition={horizontalPosition}
          letterWidth={letterWidth}
        />
      ) : ''}
      {children}
    </div>
  );
}

export default DisplayerHeader;

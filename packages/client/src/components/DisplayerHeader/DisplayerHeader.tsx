import React, { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';
import { spreadLetters } from '../../helpers/displayer.helper';
import Cursor from './Cursor/Cursor';
import styles from './DisplayerHeader.module.scss';

const DisplayerHeader = function () {
  const {
    letterWidth,
    horizontalPosition,
    userInput,
    wordIndex,
    setHorizontalPosition,
    wordsStack,
    theme,
    setLetterWidth,
  } = useContext(MainContext);

  return (
    <div className={styles.displayerHeaderWrapper}>
      <p
        className={styles.displayerHeader}
        style={{
          color: theme?.secondary,
        }}
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
          theme={theme}
        />
      ) : ''}
    </div>
  );
};

export default DisplayerHeader;

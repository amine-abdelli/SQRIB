/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';
import { setComputedWordsColor, splitStringToSpans } from '../../helpers/displayer.helper';
import Overlay from '../Overlay/Overlay.component';

import styles from './Displayer.module.scss';

function Displayer() {
  const {
    userInput, wordIndex, wordsStack, fontSize, difficulty,
    setShowModeSelection, correctWords, offSet, setYFocusedPosition, setYNextPosition,
  } = useContext(MainContext);

  const displayedWords = wordsStack?.map((word: string, i: number): ReactElement => {
    if (i === wordIndex) {
      return (
        <div className={styles.overlay}>
          <span
            ref={(element: any) => setYFocusedPosition(element?.getBoundingClientRect().y)}
            className={styles.wordFocus}
          >
            {splitStringToSpans(word, userInput)}
          </span>
        </div>
      );
    }
    if (i === wordIndex + 1) {
      return (
        <div className={styles.overlay}>
          <span ref={(element: any) => setYNextPosition(element?.getBoundingClientRect().y)}>
            {` ${word} `}
          </span>
        </div>
      );
    }
    return (
      <span
        key={`${word + i}`}
        style={{ color: setComputedWordsColor(word, i, wordIndex, correctWords) }}
      >
        {` ${word} `}
      </span>
    );
  });

  return (
    <div className={styles.displayer}>
      <div className={styles.borderTop} />
      <div style={{ transform: `translate(0, ${offSet}px`, fontSize }} className="content">
        {displayedWords}
      </div>
      {/* Overlay showing over displayer when mode hasn't been yet selected */}
      {!difficulty && (
        <Overlay
          onClick={() => setShowModeSelection(true)}
        />
      )}
    </div>
  );
}

export { Displayer };

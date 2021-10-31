import React, { ReactElement } from 'react';
import { setComputedWordsColor, splitStringToSpans } from '../../pages/helpers/WordDisplayer.helper';
import { WordsDisplayerProps } from './WordsDisplayer.interfaces';
import styles from './WordsDisplayer.module.scss';

const WordsDisplayer = ({ wordsToDisplay, userInput, wordIndex, setYNextPosition, offSet, setYFocusedPosition, computedWords }: WordsDisplayerProps) => {
  const displayedWords = wordsToDisplay?.map((word: string, i: number): ReactElement => {
    if (i === wordIndex) {
      return (
        <div
          className={styles.overlay}
        >
          <span ref={(element: any) => setYFocusedPosition(element?.getBoundingClientRect().y)} className={styles.wordFocus}>
            {splitStringToSpans(word, userInput)}
          </span>
        </div>);
    }
    if (i === wordIndex + 1) {
      return (
        <div
          className={styles.overlay}
        >
          <span ref={(element: any) => setYNextPosition(element?.getBoundingClientRect().y)}>
            {` ${word} `}
          </span>
        </div>);
    }
    return (
      <span
        key={i + Date.now()}
        style={{ color: setComputedWordsColor(word, i, wordIndex, computedWords)}}
      >
        {` ${word} `}
      </span>
    );
  });

  return (
    <div className={styles.wordsDisplayer} >
      <div style={{ transform: `translate(0, ${offSet}px`}} className="content">
        {displayedWords}
      </div>
    </div>
  );
};

export { WordsDisplayer };

import React, { ReactElement, useContext } from 'react';
import { MainContext } from '../../../pages/Main/MainContext';
import { setComputedWordsColor, splitStringToSpans } from '../../helpers/displayer.helper';
import { WordsDisplayerProps } from './WordsDisplayer.interfaces';
import styles from './WordsDisplayer.module.scss';

const WordsDisplayer = ({ wordsToDisplay, setYNextPosition, offSet, setYFocusedPosition, computedWords, fontSize }: WordsDisplayerProps) => {
  const { userInput, wordIndex } = useContext(MainContext);

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
      <div className={styles.borderTop} />
      <div style={{ transform: `translate(0, ${offSet}px`, fontSize: fontSize}} className="content">
        {displayedWords}
      </div>
    </div>
  );
};

export { WordsDisplayer };

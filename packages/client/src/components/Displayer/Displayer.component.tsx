/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ReactElement, useContext, useState,
} from 'react';
import { MainContext } from '../../context/MainContext';
import { splitStringToSpans } from '../../utils/displayer.utils';
import { setComputedWordsColor } from '../../utils/words.utils';
import Overlay from '../Overlay/Overlay.component';
import styles from './Displayer.module.scss';
import WordDisplayer from './subComponents/WordDisplayer.component';

function Displayer() {
  const [showOverLay, setShowOverLay] = useState(true);
  const {
    userInput, wordIndex, wordsStack, fontSize,
    correctWords, offSet, setYFocusedPosition, setYNextPosition,
  } = useContext(MainContext);

  const displayedWords = wordsStack?.map((word: string, i: number): ReactElement => {
    if (i === wordIndex) {
      return (
        <WordDisplayer
          className={styles.wordFocus}
          setState={setYFocusedPosition}
          word={splitStringToSpans(word, userInput)}
        />
      );
    }
    if (i === wordIndex + 1) {
      return (
        <WordDisplayer style={{ margin: 0 }} setState={setYNextPosition} word={` ${word} `} />
      );
    }
    return (
      <WordDisplayer
        key={`${word + i}`}
        word={` ${word} `}
        style={{ color: setComputedWordsColor(word, i, wordIndex, correctWords), margin: 0 }}
      />
    );
  });

  return (
    <div onClick={() => setShowOverLay(!showOverLay)} className={styles.displayer}>
      <div className={styles.borderTop} />
      <div style={{ transform: `translate(0, ${offSet}px`, fontSize }} className="content">
        {displayedWords}
      </div>
      {showOverLay && (
        <Overlay />
      )}
    </div>
  );
}

export { Displayer };

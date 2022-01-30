/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from 'next/dist/client/router';
import React, {
  ReactElement, useContext,
} from 'react';
import { MainContext } from '../../context/MainContext';
import { splitStringToSpans } from '../../utils/displayer.utils';
import { setComputedWordsColor } from '../../utils/words.utils';
import Overlay from '../Overlay/Overlay.component';
import styles from './Displayer.module.scss';
import WordDisplayer from './subComponents/WordDisplayer.component';

function Displayer(
  { wordsStack, focusedLetter }: { wordsStack: string[], focusedLetter?: string },
) {
  const isDidacticiel = useRouter().pathname === '/didacticiel';
  const {
    userInput, wordIndex, fontSize,
    correctWords, offSet, setYFocusedPosition,
    setYNextPosition, startCountDown, countDown, gameMode, computedWords,
  } = useContext(MainContext);

  const overlayProps = {
    gameMode, countDown, startCountDown, computedWords,
  };

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
  const isOverlayTriggered = !isDidacticiel ? !startCountDown : false;
  return (
    <div className={styles.displayer}>
      <div className={styles.borderTop} />
      <div style={{ transform: `translate(0, ${offSet}px`, fontSize }} className="content">
        {displayedWords}
      </div>
      {isOverlayTriggered && (
        <Overlay {...overlayProps} />
      )}
    </div>
  );
}

Displayer.defaultProps = {
  focusedLetter: undefined,
};

export { Displayer };

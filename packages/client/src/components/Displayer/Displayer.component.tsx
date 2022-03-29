/* eslint-disable max-len */
import { FontSizes } from '@aqac/utils';
import { Card } from '@nextui-org/react';
import { useRouter } from 'next/dist/client/router';
import React, {
  ReactElement, useContext,
} from 'react';
import { MainContext } from '../../context/MainContext';
import { useGetSelf } from '../../hooks/useGetSelf';
import { splitStringToSpans } from '../../utils/displayer.utils';
import { Colors, Routes } from '../../utils/enums';
import Overlay from '../Overlay/Overlay.component';
import styles from './Displayer.module.scss';
import WordDisplayer from './subComponents/WordDisplayer.component';

function Displayer(
  { wordsStack }: { wordsStack: string[] },
) {
  const isMain = useRouter().pathname === Routes.MAIN;
  const { data } = useGetSelf();
  const fontSize = data?.self.settings?.fontSize || FontSizes.LARGE;
  const {
    userInput, wordIndex,
    offSet, setYFocusedPosition,
    setYNextPosition, startTimer, countDown, gameMode, computedWords,
  } = useContext(MainContext);

  const overlayProps = {
    gameMode, countDown, startTimer, computedWords,
  };
  const displayedWords = wordsStack?.map((word: string, i: number): ReactElement => {
    const isWordPassed = wordIndex && computedWords && wordsStack && i && (i < wordIndex);

    if (i === wordIndex) {
      return (
        <>
          {' '}
          <WordDisplayer
            className={styles.wordFocus}
            style={{ color: Colors.GREY }}
            key={`${word + i}`}
            setState={setYFocusedPosition}
            word={splitStringToSpans(word, userInput)}
            fontSize={fontSize}
          />
        </>
      );
    }
    if (i === wordIndex + 1) {
      return (
        <>
          {' '}
          <WordDisplayer
            style={{ color: Colors.GREY }}
            key={`${word + i}`}
            setState={setYNextPosition}
            word={` ${word} `}
            fontSize={fontSize}
          />
        </>
      );
    }
    if (i < wordIndex) {
      return (
        <>
          {' '}
          <WordDisplayer
            style={{
              textDecoration: isWordPassed && (wordsStack[i] !== computedWords[i]) ? 'underline red' : '',
            }}
            setState={() => null}
            key={`${word + i}`}
            word={splitStringToSpans(wordsStack[i], computedWords[i])}
            fontSize={fontSize}
          />
        </>
      );
    }
    return (
      <>
        {/* &nbsp; */}
        <WordDisplayer
          style={{ color: Colors.GREY }}
          key={`${word + i}`}
          word={` ${word} `}
          fontSize={fontSize}
        />
        {/* &nbsp; */}
      </>
    );
  });
  const isOverlayTriggered = isMain ? !startTimer : false;
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Card>
        <div className={styles.displayer}>
          <div className={styles.borderTop} />
          <div style={{ transform: `translate(0, ${offSet}px`, fontSize }}>
            {displayedWords}
          </div>
          {isOverlayTriggered && (
            <Overlay {...overlayProps} />
          )}
        </div>
      </Card>
    </div>
  );
}

export { Displayer };

/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import { Card } from '@nextui-org/react';
import { FontSizes } from '@sqrib/utils';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useContext, useMemo } from 'react';
import { MainContext } from '../../context/MainContext';
import { useGetSelf } from '../../hooks/useGetSelf';
import { splitStringToSpans } from '../../utils/displayer.utils';
import { Colors, Routes } from '../../utils/enums';
import Overlay from '../Overlay/Overlay.component';
import styles from './Displayer.module.scss';
import { DisplayerProps } from './Displayer.props';
import WordDisplayer from './subComponents/WordDisplayer.component';

function Displayer(
  { wordsStack, bordered }: DisplayerProps,
) {
  const isMain = useRouter().pathname === Routes.MAIN;
  const { data } = useGetSelf();
  const fontSize = data?.self.settings?.fontSize || FontSizes.LARGE;
  const {
    userInput, wordIndex,
    offSet, setYFocusedPosition,
    setYNextPosition, startTimer, countDown, computedWords,
  } = useContext(MainContext);

  const overlayProps = {
    countDown, startTimer, computedWords,
  };

  const displayedWords = useMemo(() => wordsStack?.map((word: string, i: number): ReactElement => {
    const isWordPassed = wordIndex && computedWords && wordsStack && i && (i < wordIndex);
    if (i === wordIndex) {
      return (
        <>
          {' '}
          <WordDisplayer
            className={styles.wordFocus}
            style={{ color: Colors.GREY }}
            key={i}
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
            key={i}
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
            style={{ textDecoration: isWordPassed && (wordsStack[i] !== computedWords[i]) ? 'underline red' : '' }}
            setState={() => null}
            key={i}
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
          wordKey={i}
          word={` ${word} `}
          fontSize={fontSize}
        />
        {/* &nbsp; */}
      </>
    );
  }), [wordsStack, wordIndex, computedWords, fontSize, setYFocusedPosition, userInput, setYNextPosition]);
  const isOverlayTriggered = isMain ? !startTimer : false;
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Card style={{ borderRadius: '0px', boxShadow: bordered ? '4px 4px 0 black' : 'none', border: bordered ? '3px solid black' : '' }}>
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

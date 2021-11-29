/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout/Layout';
import Nav from '../src/components/Nav/Nav';
import SideBar from '../src/components/SideBar/SideBar';
import { ITheme, themes } from '../styles/theme';
import '../styles/globals.scss';
import styles from '../styles/_app.module.scss';
import { Position } from '../src/helpers/enums/Direction.enum';
import Modal from '../src/components/Modal/Modal';
import { Language } from '../src/helpers/enums/Language.enum';
import ModeSelection from '../src/components/Modal/ModeSelection';
import { GameOptions } from '../src/helpers/mode';
import { GameMode } from '../src/helpers/enums/Mode.enum';
import { MainContext } from '../src/contexts/MainContext';
import { FontSize } from '../src/helpers/enums/FontSize.enum';
import { shuffleWordsStack } from '../src/helpers/displayer.helper';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ITheme>(themes.LIGHT);
  const [fontSize, setFontSize] = useState<number>(FontSize.MEDIUM);
  const [showModeSelection, setShowModeSelection] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<string>(GameMode.ONE);
  const [language, setLanguage] = useState<string>(Language.FR);
  const [difficulty, setDifficulty] = useState<string>();
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [offSet, setOffSet] = useState<number | undefined>(0);
  const [yFocusedPosition, setYFocusedPosition] = useState<number | undefined>(0);
  const [yNextPosition, setYNextPosition] = useState<number | undefined>(0);
  const [computedWords, setComputedWords] = useState<Array<string>>([]);
  const [correctWords, setCorrectWords] = useState<Array<string>>([]);
  const [horizontalPosition, setHorizontalPosition] = useState<number | undefined>();
  const [letterWidth, setLetterWidth] = useState<number | undefined>();
  const [wordsStack, setWordsStack] = useState<Array<string>>(
    shuffleWordsStack(language, GameOptions[gameMode], difficulty),
  );
  const [countDown, setCountDown] = useState<number>(
    GameOptions[gameMode || GameMode.ONE]?.timer || 60,
  );
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    setWordsStack(shuffleWordsStack(language, GameOptions[gameMode], difficulty));
  }, [language]);

  function onGameModeSelection(selectedMode: string) {
    setGameMode(selectedMode);
    setShowModeSelection(false);
  }

  const MainContextProps = useMemo(() => ({
    userInput,
    wordIndex,
    wordCount,
    isTimeOut,
    setIsTimeOut,
    startCountDown,
    setStartCountDown,
    gameMode,
    countDown,
    wordsStack,
    setWordsStack,
    computedWords,
    setComputedWords,
    correctWords,
    setCorrectWords,
    setCountDown,
    setWordCount,
    setWordIndex,
    setUserInput,
    score,
    setScore,
    offSet,
    setOffSet,
    yFocusedPosition,
    setYFocusedPosition,
    yNextPosition,
    setYNextPosition,
    horizontalPosition,
    setHorizontalPosition,
    letterWidth,
    setLetterWidth,
    fontSize,
    language,
    difficulty,
    setFontSize,
    theme,
    setShowModeSelection,
  }), [userInput,
    wordIndex,
    wordCount,
    isTimeOut,
    startCountDown,
    gameMode,
    countDown,
    wordsStack,
    setWordsStack,
    computedWords,
    correctWords,
    score,
    setScore,
    offSet,
    yFocusedPosition,
    yNextPosition,
    horizontalPosition,
    letterWidth,
    fontSize,
    language,
    difficulty,
    theme,
  ]);

  return (
    <>
      <Layout theme={theme}>
        <Nav theme={theme} />
        <div style={{ display: 'flex' }}>
          <SideBar position={Position.LEFT} theme={theme} />
          <div className={styles.componentWrapper}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <MainContext.Provider value={MainContextProps}>
                <Component
                  {...pageProps}
                />
              </MainContext.Provider>
            </div>
          </div>
          <SideBar
            setLanguage={setLanguage}
            position={Position.RIGHT}
            setFontSize={setFontSize}
            setTheme={setTheme}
            theme={theme}
          />
        </div>
      </Layout>
      {/* Selection mode modal */}
      <Modal
        showModeSelection={showModeSelection}
        setShowModeSelection={setShowModeSelection}
        gameMode={gameMode}
        content={(
          <ModeSelection
            setDifficulty={setDifficulty}
            // eslint-disable-next-line react/jsx-no-bind
            onGameModeSelection={onGameModeSelection}
            theme={theme}
          />
)}
      />
    </>
  );
}

export default MyApp;

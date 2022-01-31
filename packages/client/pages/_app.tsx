/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { shuffleWordsStack } from '@aqac/utils';
import { FocusStyleManager } from '@blueprintjs/core';
import { useRouter } from 'next/dist/client/router';
import Layout from '../src/components/Layout/Layout.component';
import Nav from '../src/components/Nav/Nav.component';
import SideBar from '../src/components/SideBar/SideBar.component';
import { ITheme, themes } from '../styles/theme';
import '../styles/sass/globals.scss';
import styles from '../styles/sass/pages/_app.module.scss';
import { Position } from '../src/utils/enums/Direction.enum';
import Modal from '../src/components/Modal/Modal.component';
import { Language } from '../src/utils/enums/Language.enum';
import ModeSelection from '../src/components/Modal/ModeSelection';
import { GameOptions } from '../src/utils/mode';
import { GameMode } from '../src/utils/enums/Mode.enum';
import { MainContext } from '../src/context/MainContext';
import { FontSize } from '../src/utils/enums/FontSize.enum';
import { client } from '../client';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ITheme>(themes.LIGHT);
  const [fontSize, setFontSize] = useState<number>(FontSize.SMALL);
  const [showModeSelection, setShowModeSelection] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<string>(GameMode.ONE);
  const [language, setLanguage] = useState<string>(Language.FR);
  const [difficulty, setDifficulty] = useState<string>();
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [offSet, setOffSet] = useState<number | undefined>(0);
  const [yFocusedPosition, setYFocusedPosition] = useState<number | undefined>(0);
  const [yNextPosition, setYNextPosition] = useState<number | undefined>(0);
  const [computedWords, setComputedWords] = useState<Array<string>>([]);
  const [correctWords, setCorrectWords] = useState<Array<string>>([]);
  const [horizontalPosition, setHorizontalPosition] = useState<number | undefined>();
  const [letterWidth, setLetterWidth] = useState<number | undefined>();
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [wordsStack, setWordsStack] = useState<string[]>(
    shuffleWordsStack(language, GameOptions[gameMode].stackLength),
  );
  const [countDown, setCountDown] = useState<number>(
    GameOptions[gameMode || GameMode.ONE]?.timer || 60,
  );
  useEffect(() => {
    onRestart();
  }, [useRouter().pathname]);

  const onRestart = useCallback(() => {
    setWordsStack(shuffleWordsStack(language, GameOptions[gameMode].stackLength));
    setStartCountDown(false);
    setUserInput('');
    setScore(0);
    setWordIndex(0);
    setOffSet(0);
    setCorrectWords([]);
    setComputedWords([]);
    setIsTimeOut(false);
    setCountDown(GameOptions[gameMode]?.timer);
  }, []);

  useEffect(() => {
    setWordsStack(shuffleWordsStack(language, GameOptions[gameMode].stackLength));
  }, [language, gameMode]);

  function onGameModeSelection(selectedMode: string) {
    setGameMode(selectedMode);
    setShowModeSelection(false);
  }

  useEffect(() => {
    setFontSize(FontSize.SMALL);
  }, [fontSize]);

  const MainContextProps = useMemo(() => ({
    userInput, wordIndex, isTimeOut, setIsTimeOut, startCountDown, setStartCountDown, gameMode, countDown, wordsStack, setWordsStack, computedWords, setComputedWords, correctWords, setCorrectWords, setCountDown, setWordIndex, setUserInput, score, setScore, offSet, setOffSet, yFocusedPosition, setYFocusedPosition, yNextPosition, setYNextPosition, horizontalPosition, setHorizontalPosition, letterWidth, setLetterWidth, fontSize, language, difficulty, setFontSize, theme, setShowModeSelection, onRestart,
  }), [userInput, wordIndex, isTimeOut, startCountDown, gameMode, countDown, wordsStack, setWordsStack, computedWords, correctWords, score, setScore, offSet, yFocusedPosition, yNextPosition, horizontalPosition, letterWidth, fontSize, language, difficulty, theme, onRestart]);

  // Disable ugly focus on blueprint's elements
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <ApolloProvider client={client}>
      <Layout theme={theme}>
        <Nav
          setTheme={setTheme}
          setLanguage={setLanguage}
          setFontSize={setFontSize}
          theme={theme}
          startCountDown={startCountDown}
        />
        <div style={{ display: 'flex' }}>
          <SideBar position={Position.LEFT} theme={theme} />
          <div className={styles.componentWrapper}>
            <div style={{ justifyContent: 'center', display: 'flex', height: '100%' }}>
              <MainContext.Provider value={MainContextProps}>
                <Component theme={theme} {...pageProps} />
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
        content={(
          <ModeSelection
            setDifficulty={setDifficulty}
            onGameModeSelection={onGameModeSelection}
            theme={theme}
          />
        )}
      />
    </ApolloProvider>
  );
}

export default MyApp;

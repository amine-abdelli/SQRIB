/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';
import { generateWordSet, FontSizes, Languages } from '@sqrib/utils';
import { useRouter } from 'next/dist/client/router';
import Layout from '../src/components/Layout/Layout.component';
import SideBar from '../src/UI/SideBar/SideBar.component';
import '../styles/sass/globals.scss';
import styles from '../styles/sass/pages/_app.module.scss';
import { GameOptions } from '../src/utils/mode';
import { GameMode } from '../src/utils/enums/Mode.enum';
import { MainContext } from '../src/context/MainContext';
import { client } from '../client';
import { Alert } from '../src/components/Alert/Alert.component';
import { useWindowSize } from '../src/hooks/useWindowSize';
import Header from '../src/components/Header/Header.component';

function MyApp({ Component, pageProps }: AppProps) {
  const [fontSize, setFontSize] = useState<number>(FontSizes.LARGE);
  const [gameMode] = useState<string>(GameMode.COUNTDOWN);
  const [language, setLanguage] = useState<string>(Languages.FR);
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
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  // On mobile and tablet size only the menu take the full screen
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wordsStack, setWordsStack] = useState<string[]>(
    generateWordSet(language, GameOptions[gameMode].stackLength),
  );
  const [countDown, setCountDown] = useState<number>(
    60,
  );

  // Is triggered everytime we change route
  useEffect(() => {
    onRestart();
    setIsMenuOpen(false);
  }, [useRouter().pathname]);

  const onRestart = useCallback(() => {
    setWordsStack(generateWordSet(language, GameOptions[gameMode].stackLength));
    setStartTimer(false);
    setUserInput('');
    setScore(0);
    setWordIndex(0);
    setOffSet(0);
    setCorrectWords([]);
    setComputedWords([]);
    setIsTimeOut(false);
    setCountDown(GameOptions[gameMode]?.timer);
  }, [gameMode, language, setIsTimeOut]);

  useEffect(() => {
    setWordsStack(generateWordSet(language, GameOptions[gameMode].stackLength));
    setCountDown(60);
  }, [language, gameMode]);

  const MainContextProps = useMemo(() => ({
    userInput, wordIndex, isTimeOut, setIsTimeOut, startTimer, setStartTimer, gameMode, countDown, wordsStack, setWordsStack, computedWords, setComputedWords, correctWords, setCorrectWords, setCountDown, setWordIndex, setUserInput, score, setScore, offSet, setOffSet, yFocusedPosition, setYFocusedPosition, yNextPosition, setYNextPosition, horizontalPosition, setHorizontalPosition, letterWidth, setLetterWidth, fontSize, language, setFontSize, onRestart, setLanguage,
  }), [userInput, wordIndex, isTimeOut, startTimer, gameMode, countDown, wordsStack, setWordsStack, computedWords, correctWords, score, setScore, offSet, yFocusedPosition, yNextPosition, horizontalPosition, letterWidth, fontSize, language, onRestart, setLanguage]);

  const { isMediumScreen, isSmallScreen } = useWindowSize();
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Alert />
        <div className='flex' style={{ padding: isSmallScreen ? '0.5rem' : '1rem' }}>
          <SideBar fullScreen={isMediumScreen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className='flex w100 flex-column'>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className={styles.componentWrapper}>
              <div className='flex justify-center h100'>
                <MainContext.Provider value={MainContextProps}>
                  <NextUIProvider>
                    <Component style={{ width: '100%' }} {...pageProps} />
                    {/* Compensate the height of the side bar appearing on the bottom of the screen on mobile view */}
                    {isMediumScreen && <div style={{ height: '40px' }} />}
                  </NextUIProvider>
                </MainContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;

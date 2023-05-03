/* eslint-disable max-len */
import React, { ReactElement, useEffect, useState } from 'react';
import { Languages, dictionaries } from '@sqrib/shared';
import { useTimestamp } from '../../hooks/useTimestamp.hook';
import { calculateAccuracy, calculatePoints, calculateWPM } from '../../utils';
import { useTimer } from '../../hooks/useTimer.hook';
import { FontSize } from '../../utils/fontsize.enum';
import { TTrainingMode, TrainingMode } from '../Options/Options.props';

interface IScore {
  wpm: number,
  accuracy: number,
  typedWords: number,
  points: number,
}

export interface EngineProps {
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  wordChain: string[],
  setWordChain: React.Dispatch<React.SetStateAction<string[]>>,
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  typedWords: string[],
  setTypedWords: React.Dispatch<React.SetStateAction<string[]>>,
  dictionary: string[],
  indexOfProgression: number,
  setIndexOfProgression: React.Dispatch<React.SetStateAction<number>>,
  score: IScore,
  isRunning: boolean,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldReset: React.Dispatch<React.SetStateAction<boolean>>,
  fontSize: FontSize,
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>,
  language: Languages,
  setLanguage: React.Dispatch<React.SetStateAction<Languages>>,
  mode: TTrainingMode,
  setMode: React.Dispatch<React.SetStateAction<TTrainingMode>>,
  countDown: number,
  setCountDown: React.Dispatch<React.SetStateAction<number>>,
  wordCount: number,
  setWordCount: React.Dispatch<React.SetStateAction<number>>,
}

export interface EngineChildren {
  children: ReactElement<EngineProps> | ReactElement<EngineProps>[];
}

// Faire en sorte de pouvoir rejouer une même série de mots et de comparer ses propres scores sur une même série de mots.
//                        Après plusieurs score sur une même série de mots, proposer d'enregister le meilleur score sur cette série de mots
// Au clique sur un bouton "Rejouer", on remet le timer à 60, on remet le score à 0, on remet le mot à 0
// On peut également "Rejouer" une nouvelle série de mots
// Proposer des options de langue, de nombre de mots, de durée de partie, de difficulté (nombre de lettres par mot avec ou sans accent etc ...)
// Proposer des séries de mots aléatoire, custom, suggéré, etc ...
// Pour les séries de mots custom et suggérés disposé d'un leaderboard propre à cette même série de mots pour se comparer aux autres joueurs

// Proposer un affichage de mots vertical et horizontal
function Engine({ children }: EngineChildren) {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [indexOfProgression, setIndexOfProgression] = React.useState<number>(0);
  const [wordChain, setWordChain] = React.useState<string[]>(dictionaries.fr.slice(1, 11));
  const [startTime, setStartTime] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [endTime, setEndTime] = React.useState(useTimestamp(isRunning));
  const [shouldReset, setShouldReset] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.SMALL);
  const [language, setLanguage] = React.useState<Languages>(Languages.FR);
  const [mode, setMode] = useState<TTrainingMode>(TrainingMode.TIME_TRIAL);
  const [countDown, setCountDown] = useState(60);
  const [wordCount, setWordCount] = useState(100);

  function onFinish() {
    setIsRunning(false);
    setInput('');
  }

  const [score, setScore] = React.useState<IScore>({
    wpm: 0, accuracy: 0, typedWords: 0, points: 0,
  });

  const useTimerOptions = {
    initialValue: mode === TrainingMode.TIME_TRIAL ? countDown : 0,
    countDown: mode === TrainingMode.TIME_TRIAL,
    isRunning,
    onFinish,
  };

  const timer = useTimer(useTimerOptions);
  /**
   * Options
   * - Timer - 15 30 45 *60* 75 90 105 (count down) /// initialValue: 60, isRunning, onFinish: () => console.log('FINISHED'), countDown: true
   * - Number of words - *100* (count up) /// initialValue: 0, isRunning, onFinish: () => console.log('FINISHED'), countDown: false
   * - Difficulty - easy *medium* hard // Options sent to the backend
   * - Language - fr *en* es de // Options sent to the backend
   * - Word chain - custom, *random*, suggested // Options sent to the backend
   */

  // Reset the game on click on "Reset"
  useEffect(() => {
    if (shouldReset) {
      setTypedWords([]);
      setInput('');
      setIndexOfProgression(0);
      setIsRunning(false);
      setWordChain(dictionaries.fr.slice(1, 11)); // TODO Query wordChain from the backend
      setStartTime(0);
      setEndTime(0);
      setScore({
        wpm: 0, accuracy: 0, typedWords: 0, points: 0,
      });
      setShouldReset(false);
    }
  }, [shouldReset]);

  // Start the game when the user starts typing
  useEffect(() => {
    if (!isRunning && input.length) {
      setIsRunning(true);
    }
  }, [input.length]);

  // End the game when the user reach the end of the word chain
  useEffect(() => {
    if (typedWords.length === wordChain.length) {
      setIsRunning(false);
    }
  }, [typedWords]);

  const actualTime = useTimestamp(isRunning);
  useEffect(() => {
    if (isRunning) {
      setEndTime(actualTime);
      setScore({
        wpm: calculateWPM(wordChain, typedWords, startTime, endTime),
        accuracy: calculateAccuracy(wordChain, typedWords),
        typedWords: typedWords.length,
        points: calculatePoints(wordChain, typedWords, startTime, endTime),
      });
    }
  }, [useTimestamp(isRunning), isRunning]);

  useEffect(() => {
    setTypedWords([]);
    setIndexOfProgression(0);
    setWordChain(dictionaries.fr.slice(1, 11)); // TODO Query wordChain from the backend
    setStartTime(0);
    setEndTime(0);
    if (isRunning) {
      setStartTime(Date.now());
    } else {
      setEndTime(Date.now());
    }
  }, [isRunning]);

  const props = {
    input,
    setInput,
    // TODO Query wordChain from the backend
    wordChain,
    setWordChain,
    timer,
    typedWords,
    setTypedWords,
    indexOfProgression,
    setIndexOfProgression,
    score,
    isRunning,
    setIsRunning,
    setShouldReset,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    mode,
    setMode,
    countDown,
    setCountDown,
    wordCount,
    setWordCount,
  };

  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, props))}
    </>
  );
}

export { Engine };

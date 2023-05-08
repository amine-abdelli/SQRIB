/* eslint-disable max-len */
import React, { ReactElement, useEffect, useState } from 'react';
import { Languages } from '@sqrib/shared';
import { useTimestamp } from '../../hooks/useTimestamp.hook';
import { calculateAccuracy, calculatePoints, calculateWPM } from '../../utils';
import { useTimer } from '../../hooks/useTimer.hook';
import { FontSize } from '../../utils/fontsize.enum';
import { TTrainingMode, TrainingMode, WordsCollectionLayout } from '../Options/Options.props';
import { useGetTrainingWordChain } from '../../hooks/queries/useGetTraining.hook';

interface IScore {
  wpm: number,
  accuracy: number,
  typedWords: number,
  points: number,
  startTime: number,
  endTime: number,
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
  layout: WordsCollectionLayout,
  setLayout: React.Dispatch<React.SetStateAction<WordsCollectionLayout>>,
  resetTraining: () => void,
}

export interface EngineChildren {
  children: ReactElement<EngineProps> | ReactElement<EngineProps>[];
}
// World's wpm record held by Sean Wrona since 2010
const WORLD_WPM_RECORD = 256;
// Let's double it to be save
const MAX_POSSIBLE_WORLD_COUNT = WORLD_WPM_RECORD * 2;

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
  const [wordChain, setWordChain] = React.useState<string[]>([]);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [endTime, setEndTime] = React.useState(useTimestamp(isRunning));
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.SMALL);
  const [language, setLanguage] = React.useState<Languages>(Languages.FR);
  const [mode, setMode] = useState<TTrainingMode>(TrainingMode.TIME_TRIAL);
  const [countDown, setCountDown] = useState(60);
  const [wordCount, setWordCount] = useState(100);
  const [layout, setLayout] = useState<WordsCollectionLayout>(WordsCollectionLayout.HORIZONTAL);

  const [score, setScore] = React.useState<IScore>({
    wpm: 0, accuracy: 0, typedWords: 0, points: 0, startTime: 0, endTime: 0,
  });
  const isTimeTrialMode = mode === TrainingMode.TIME_TRIAL;

  const { data, refetch } = useGetTrainingWordChain({ count: isTimeTrialMode ? MAX_POSSIBLE_WORLD_COUNT : wordCount, language });
  function onFinish() {
    setIsRunning(false);
    setInput('');
    refetch();
  }
  const useTimerOptions = {
    initialValue: isTimeTrialMode ? countDown : 0,
    countDown: isTimeTrialMode,
    isRunning,
    onFinish,
  };
  const timer = useTimer(useTimerOptions);

  useEffect(() => {
    if (data) {
      setWordChain(data.data);
    }
  }, [language, wordCount, data, refetch]);
  // TODO Reset TIMER on timer (13 30 60 75 90 120) and mode change
  /**
   * Options
   * - Timer - 15 30 45 *60* 75 90 105 (count down) /// initialValue: 60, isRunning, onFinish: () => console.log('FINISHED'), countDown: true
   * - Number of words - *100* (count up) /// initialValue: 0, isRunning, onFinish: () => console.log('FINISHED'), countDown: false
   * - Difficulty - easy *medium* hard // Options sent to the backend
   * - Language - fr *en* es de // Options sent to the backend
   * - Word chain - custom, *random*, suggested // Options sent to the backend
   */

  // Reset all game parameters
  function resetTraining() {
    refetch();
    setTypedWords([]);
    setInput('');
    setIndexOfProgression(0);
    setIsRunning(false);
    setStartTime(0);
    setEndTime(0);
    setScore({
      wpm: 0, accuracy: 0, typedWords: 0, points: 0, startTime: 0, endTime: 0,
    });
  }

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

  const currentTime = useTimestamp(isRunning);
  useEffect(() => {
    if (isRunning) {
      setEndTime(currentTime);
      setScore({
        wpm: calculateWPM(wordChain, typedWords, startTime, endTime),
        accuracy: calculateAccuracy(wordChain, typedWords),
        typedWords: typedWords.length,
        points: calculatePoints(wordChain, typedWords, startTime, endTime),
        startTime,
        endTime,
      });
    }
  }, [currentTime, isRunning, input]);

  useEffect(() => {
    setTypedWords([]);
    setIndexOfProgression(0);
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
    resetTraining,
    wordChain,
    timer,
    typedWords,
    setTypedWords,
    indexOfProgression,
    setIndexOfProgression,
    score,
    isRunning,
    setIsRunning,
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
    layout,
    setLayout,
  };

  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, props))}
    </>
  );
}

export { Engine };

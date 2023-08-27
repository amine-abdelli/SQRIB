/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Languages, TLanguages } from '@sqrib/shared';
import { useTimestamp } from '../../../hooks/useTimestamp.hook';
import { calculateZenModeAccuracy, calculatePoints, calculateWPM } from '../../../utils';
import { useTimer } from '../../../hooks/useTimer.hook';
import { FontSize } from '../../../utils/fontsize.enum';
import { TTrainingMode, TrainingMode, WordsCollectionLayout } from '../../../components/Options/Options.props';
import { useGetTrainingWordChain, useSaveTrainingScore } from '../../../api/queries';
import { EngineChildren, IScore } from './Engine.props';
import { useAFKChecker } from '../../../hooks';
import { useModal } from '../../../contexts';

// World's wpm record held by Sean Wrona since 2010
const WORLD_WPM_RECORD = 256;

function TrainingEngine({ children }: EngineChildren) {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [indexOfProgression, setIndexOfProgression] = React.useState<number>(0);
  const [wordChain, setWordChain] = React.useState<string[]>([]);
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.SMALL);
  const [language, setLanguage] = React.useState<TLanguages>(Languages.FR);
  const [mode, setMode] = useState<TTrainingMode>(TrainingMode.TIME_TRIAL);
  const [countDown, setCountDown] = useState(60);
  const [wordCount, setWordCount] = useState(75);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isUserAllowToType, setIsUserAllowToType] = useState<boolean>(true);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState(useTimestamp(isRunning));
  const [layout, setLayout] = useState<WordsCollectionLayout>(WordsCollectionLayout.VERTICAL);
  const [verticalOffSet, setVerticalOffSet] = useState(0);
  const [shouldOpenVictoryModal, setShouldOpenVictoryModal] = React.useState(false)
  const [isZenModeOn, setIsZenModeOn] = React.useState(true);
  const [misspellings, setMisspellings] = React.useState<string[]>([]);

  const [score, setScore] = React.useState<IScore>({
    wpm: 0, accuracy: 0, points: 0, startTime: 0, endTime: 0
  });

  const isTimeTrialMode = mode === TrainingMode.TIME_TRIAL;

  const { data, refetch } = useGetTrainingWordChain({ count: isTimeTrialMode ? ((WORLD_WPM_RECORD * 1.1) / 60) * countDown : wordCount, language });

  function onFinish() {
    setIsRunning(false);
    setIsUserAllowToType(false);
    setInput('');
  }

  const useTimerOptions = {
    initialValue: isTimeTrialMode ? countDown : 0,
    countDown: isTimeTrialMode,
    isRunning,
    onFinish,
  };

  const { timer, resetTimer } = useTimer(useTimerOptions);


  function resetScoreAndTimer() {
    // Set word collection to its initial vertical position
    setVerticalOffSet(0)
    setScore({
      wpm: 0, accuracy: 0, points: 0, startTime: 0, endTime: 0
    });
    resetTimer();
  }

  useEffect(() => {
    refetch();
  }, [])

  // Stop the game and fetch new wordChain on parameter change
  useEffect(() => {
    if (data) {
      setWordChain(data.data);
    }
  }, [data, refetch]);

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
    setTypedWords([]);
    setInput('');
    setIndexOfProgression(0);
    setIsRunning(false);
    setStartTime(0);
    setVerticalOffSet(0)
    setEndTime(0);
    setIsUserAllowToType(true);
    resetScoreAndTimer();
    setMisspellings([]);
  }

  function resetTrainingAndRefetch() {
    refetch();
    resetTraining();
  }
  // Start the game when the user starts typing
  useEffect(() => {
    if (!isRunning && input.length) {
      setIsRunning(true);
    }
  }, [input.length]);

  // Time Trial : End of game, trigger the victory modal
  useEffect(() => {
    if (!isUserAllowToType && mode === TrainingMode.TIME_TRIAL && timer === 0) {
      setIsUserAllowToType(false);
      setShouldOpenVictoryModal(true)
    }
  }, [mode, timer])

  // Speed Challenge : End the game when the user reach the end of the word chain
  useEffect(() => {
    if (isRunning && (typedWords.length === wordChain.length)) {
      setIsUserAllowToType(false);
      setIsRunning(false);
      setShouldOpenVictoryModal(true);
    }
  }, [typedWords]);

  const currentTime = useTimestamp(isRunning);

  // Check if the user is AFK and reset the game when it's the case
  useAFKChecker({
    input, timestamp: currentTime, isRunning, afkMessage: 'Your session has been reset for being AFK for too long.', callback: () => {
      setIsRunning(false);
      setIsUserAllowToType(false);
      resetTraining()
    }
  });

  // Update score every second or letter typed
  useEffect(() => {
    if (isRunning) {
      setEndTime(currentTime);
      setScore({
        wpm: calculateWPM(wordChain, typedWords, startTime, endTime),
        accuracy: calculateZenModeAccuracy(wordChain, typedWords, misspellings),
        points: calculatePoints(wordChain, typedWords, startTime, endTime, misspellings),
        startTime,
        endTime
      });
    }
  }, [currentTime, isRunning, input]);

  useEffect(() => {
    if (isRunning) {
      setStartTime(Date.now());
    } else {
      setInput('')
      setEndTime(Date.now());
    }
  }, [isRunning]);

  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        input,
        setInput,
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
        resetTraining,
        resetTrainingAndRefetch,
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
        isUserAllowToType,
        verticalOffSet,
        setVerticalOffSet,
        shouldOpenVictoryModal,
        setShouldOpenVictoryModal,
        setIsUserAllowToType,
        misspellings,
        setMisspellings,
        isZenModeOn,
        setIsZenModeOn
      })
      )}
    </>
  );
}

export { TrainingEngine };

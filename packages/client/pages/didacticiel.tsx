/* eslint-disable no-unsafe-optional-chaining */
import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  useApolloClient, useLazyQuery, useMutation,
} from '@apollo/client';
import { alphabet, DEFAULT_LEVEL } from '@aqac/utils';
import { DIDACTICIEL_WORDSET_QUERY, SELF_QUERY, UPDATE_LEVEL_MUTATION } from '@aqac/api';
import { Button, Spacer } from '@nextui-org/react';
import { ArrowLeftSquare } from 'react-iconly';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import Input from '../src/components/Input/Input.component';
import ProgressionCards from '../src/components/ProgressionCards/ProgressionCards.component';
import { MainContext } from '../src/context/MainContext';
import { useGetSelf } from '../src/hooks/useGetSelf';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import useSpeedCalculator from '../src/hooks/useSpeedCalculator';
import { useLocalStorage } from '../src/hooks/useLocalStorage';

function Didacticiel() {
  const { data, isLoggedIn } = useGetSelf();
  const { cache } = useApolloClient();
  const [updateLevel] = useMutation(UPDATE_LEVEL_MUTATION, {
    onCompleted: ({ updateLevel: updatedLevel }) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
      cache.writeQuery({
        query: SELF_QUERY,
        data: {
          self: {
            ...self,
            didacticiel_level: updatedLevel,
          },
        },
      });
    },
  });
  const [fetchOneSetByLetter,
    { loading }] = useLazyQuery(DIDACTICIEL_WORDSET_QUERY, {
    onCompleted: ({ findOneSet }) => {
      setMarkovChain(findOneSet);
      console.log('lol', findOneSet)
      cache.writeQuery({
        query: DIDACTICIEL_WORDSET_QUERY,
        data: {
          findOneSet,
        },
      });
    },
  });

  const [markovChain, setMarkovChain] = useState<string[]>();
  const [levelStoredInLocalStorage, setLevelStoredInLocalStorage] = useLocalStorage('didacticiel_level', '');
  if (!levelStoredInLocalStorage) setLevelStoredInLocalStorage(JSON.stringify(DEFAULT_LEVEL));
  const level = data?.self.didacticiel_level
  || +levelStoredInLocalStorage || DEFAULT_LEVEL;
  const {
    userInput, setUserInput, correctWords, setCorrectWords, setOffSet, setYFocusedPosition,
    setWordIndex, theme, startTimer, isTimeOut, setStartTimer, setComputedWords,
  } = useContext(MainContext);

  useEffect(() => {
    if (!markovChain && level) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level] } });
    }
  }, [loading, level]);

  useEffect(() => {
    // ! TODO: Définir une meilleur règle pour passer à une nouvelle série de mots
    /**
     * When the iteration limit is reached, switch to the next letter
     * and reset counters
     */
    if (correctWords.length === 5) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level + 1] } });
      setComputedWords([]);
      setCorrectWords([]);
      setOffSet(0);
      setWordIndex(0);
      setYFocusedPosition(0);
      if (isLoggedIn) updateLevel({ variables: { level: level + 1 } });
      setLevelStoredInLocalStorage(JSON.stringify(level + 1));
    }
  }, [correctWords, loading, level]);

  const [typingSpeed] = useSpeedCalculator(correctWords, startTimer, isTimeOut);

  useEffect(() => {
    if (userInput && !startTimer) {
      setStartTimer(true);
    }
  }, [userInput]);

  return (
    <div>
      <h1>Didacticiel</h1>
      <p className='m0'>
        Vitesse moyenne de frappe :
        {` ${typingSpeed} m/min`}
      </p>
      <div className='w100 flex justify-between mb10'>
        <ProgressionCards level={level} />
        <Button
          auto
          icon={<ArrowLeftSquare />}
          onClick={() => {
            fetchOneSetByLetter({ variables: { letter: alphabet[DEFAULT_LEVEL] } });
            if (isLoggedIn && data.self.didacticiel_level !== DEFAULT_LEVEL) {
              updateLevel({ variables: { level: DEFAULT_LEVEL } });
            } else {
              setLevelStoredInLocalStorage(JSON.stringify(DEFAULT_LEVEL));
            }
            setComputedWords([]);
            setCorrectWords([]);
            setOffSet(0);
            setWordIndex(0);
            setYFocusedPosition(0);
          }}
        />
      </div>
      <Displayer wordsStack={markovChain || []} />
      <Spacer />
      <Input
        didacticielStack={markovChain}
        setUserInput={setUserInput}
        userInput={userInput}
        isTimeOut={false}
      />
      <Spacer />
      <KeyBoard theme={theme} enable />
    </div>
  );
}

export default Didacticiel;

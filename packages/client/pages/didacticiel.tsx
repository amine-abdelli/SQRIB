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

function Didacticiel() {
  const { data } = useGetSelf();
  const { cache } = useApolloClient();
  const [updateLevel] = useMutation(UPDATE_LEVEL_MUTATION, {
    onCompleted: ({ updatedLevel }) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
      cache.writeQuery({
        query: SELF_QUERY,
        data: {
          self: {
            ...self,
            didacticiel_level: updatedLevel?.didacticiel_level,
          },
        },
      });
    },
  });
  const [fetchOneSetByLetter,
    { data: wordSet, loading }] = useLazyQuery(DIDACTICIEL_WORDSET_QUERY, {
    onCompleted: ({ findOneSet }) => {
      cache.writeQuery({
        query: DIDACTICIEL_WORDSET_QUERY,
        data: {
          findOneSet,
        },
      });
    },
  });
  const [markovChain, setMarkovChain] = useState<string[]>();
  const level = data?.self.didacticiel_level || DEFAULT_LEVEL;
  const {
    userInput, setUserInput, correctWords, setCorrectWords, setOffSet, setYFocusedPosition,
    setWordIndex, theme, startTimer, isTimeOut, setStartTimer, setComputedWords,
  } = useContext(MainContext);

  useEffect(() => {
    if (!markovChain && level) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level] } });
      setMarkovChain(wordSet?.findOneSet);
    }
  }, [loading, level]);

  useEffect(() => {
    if ((correctWords.length >= 2) && (level < alphabet.length - 1)) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level + 1] } });
    }
    // ! Définir règle pour passer à une nouvelle série de mots
    if (correctWords.length === 5) {
      setComputedWords([]);
      setCorrectWords([]);
      setOffSet(0);
      setWordIndex(0);
      setYFocusedPosition(0);
      updateLevel({ variables: { level: level + 1 } });
      setMarkovChain(wordSet?.findOneSet);
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
            if (data.self.didacticiel_level !== DEFAULT_LEVEL) {
              updateLevel({ variables: { level: DEFAULT_LEVEL } });
            }
          }}
        />
      </div>
      <Displayer wordsStack={markovChain || []} />
      <Spacer />
      <Input
        didacticielStack={markovChain}
        setUserInput={setUserInput}
        userInput={userInput}
      />
      <Spacer />
      <KeyBoard theme={theme} enable />
    </div>
  );
}

export default Didacticiel;

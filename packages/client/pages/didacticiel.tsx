/* eslint-disable no-unsafe-optional-chaining */
import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  useApolloClient, useLazyQuery, useMutation,
} from '@apollo/client';
import { alphabet, DEFAULT_LEVEL } from '@aqac/utils';
import { DIDACTICIEL_WORDSET_QUERY, SELF_QUERY, UPDATE_LEVEL_MUTATION } from '@aqac/api';
import { Button } from '@blueprintjs/core';
import { BiReset } from 'react-icons/bi';
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
    { data: wordSet, loading }] = useLazyQuery(DIDACTICIEL_WORDSET_QUERY);
  const [markovChain, setMarkovChain] = useState<string[]>();
  const level = data?.self.didacticiel_level;
  const {
    userInput, setUserInput, correctWords, setCorrectWords, setOffSet, setYFocusedPosition,
    setWordIndex, theme, startTimer, isTimeOut, setStartTimer,
  } = useContext(MainContext);

  useEffect(() => {
    if (!markovChain && level) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level] } });
      setMarkovChain(wordSet?.findOneSet);
    }
  }, [loading, level]);

  // ! TOO MUCH REFETCH MUST BE
  useEffect(() => {
    if ((correctWords.length >= 2) && (level < alphabet.length - 1)) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level + 1] } });
    }

    if (correctWords.length === 60) {
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
      <p style={{ margin: 0 }}>
        Vitesse de frappe :
        {` ${typingSpeed}mpm`}
      </p>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <ProgressionCards level={level} />
        <Button
          minimal
          style={{
            borderRadius: '10px', padding: '0px', width: '35px', height: '35px',
          }}
          icon={<BiReset size={25} />}
          onClick={() => {
            if (data.self.didacticiel_level !== DEFAULT_LEVEL) {
              updateLevel({ variables: { level: DEFAULT_LEVEL } });
            }
          }}
        />
      </div>
      <Displayer wordsStack={markovChain || []} />
      <Input
        didacticielStack={markovChain}
        setUserInput={setUserInput}
        userInput={userInput}
      />
      <KeyBoard theme={theme} enable />
    </div>
  );
}

export default Didacticiel;

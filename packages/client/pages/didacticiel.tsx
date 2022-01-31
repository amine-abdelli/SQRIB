/* eslint-disable no-unsafe-optional-chaining */
import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  useApolloClient, useLazyQuery, useMutation,
} from '@apollo/client';
import { alphabet } from '@aqac/utils';
import { DIDACTICIEL_WORDSET_QUERY, SELF_QUERY, UPDATE_LEVEL_MUTATION } from '@aqac/api';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import Input from '../src/components/Input/Input.component';
import ProgressionCards from '../src/components/ProgressionCards/ProgressionCards.component';
import { MainContext } from '../src/context/MainContext';
import { useGetSelf } from '../src/hooks/useGetSelf';

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
    setWordIndex,
  } = useContext(MainContext);

  useEffect(() => {
    if (!markovChain && level) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level] } });
      setMarkovChain(wordSet?.findOneSet);
    }

    if ((correctWords.length >= 2) && (level < alphabet.length - 1)) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level + 1] } });
    }

    if (correctWords.length === 5) {
      setCorrectWords([]);
      setOffSet(0);
      setWordIndex(0);
      setYFocusedPosition(0);
      updateLevel({ variables: { level: level + 1 } });
      setMarkovChain(wordSet?.findOneSet);
    }
  }, [correctWords, loading, level]);

  return (
    <div>
      <h1>Didacticiel</h1>
      <ProgressionCards level={level} />
      <Displayer wordsStack={markovChain || []} />
      <Input
        didacticielStack={markovChain}
        setUserInput={setUserInput}
        userInput={userInput}
      />
    </div>
  );
}

export default Didacticiel;

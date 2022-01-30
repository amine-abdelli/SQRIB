/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useState } from 'react';
import { alphabet } from '@aqac/utils';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
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
    onCompleted: (returnedData) => {
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
      cache.writeQuery({
        query: SELF_QUERY,
        data: {
          self: {
            ...self,
            didacticiel_level: returnedData.updateLevel.didacticiel_level,
          },
        },
      });
    },
  });
  const [level, setLevel] = useState<number>(data?.self.didacticiel_level - 1);
  const [fetchOneSetByLetter,
    { data: wordSet, loading }] = useLazyQuery(DIDACTICIEL_WORDSET_QUERY);

  const [markovChain, setMarkovChain] = useState<string[]>();
  const {
    userInput, setUserInput, computedWords, setComputedWords, setOffSet, setYFocusedPosition,
    setWordIndex,
  } = useContext(MainContext);

  useEffect(() => {
    setLevel(data?.self.didacticiel_level - 1);
    if (!wordSet?.findOneSet.length) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level] } });
    }
    if (wordSet && level) { setMarkovChain(wordSet?.findOneSet); }
  }, [level, wordSet, data, loading]);

  useEffect(() => {
    if ((computedWords.length === 15) && (level < alphabet.length - 1)) {
      fetchOneSetByLetter({ variables: { letter: alphabet[level + 1] } });
      setMarkovChain(wordSet?.findOneSet);
      setLevel(level + 1);
      updateLevel({ variables: { level: data?.self.didacticiel_level + 1 } });
      setComputedWords([]);
      setOffSet(0);
      setWordIndex(0);
      setYFocusedPosition(0);
    }
  }, [computedWords]);

  return (
    <div>
      <h1>Didacticiel</h1>
      <ProgressionCards level={data?.self.didacticiel_level - 1} />
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

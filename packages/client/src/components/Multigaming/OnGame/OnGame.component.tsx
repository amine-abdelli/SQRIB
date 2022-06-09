import { Spacer } from '@nextui-org/react';
import React, { useContext } from 'react';
import { Displayer } from '../../Displayer/Displayer.component';
import Input from '../../Input/Input.component';
import KeyBoard from '../../KeyBoard/KeyBoard.component';
import { MainContext } from '../../../context/MainContext';

interface OnGameProps {
  wordSet: string[];
  isGameEnded: boolean;
  isAllow: boolean;
  disabled: boolean;
}

function OnGame({
  wordSet, isGameEnded, isAllow, disabled,
}: OnGameProps) {
  const { setUserInput, userInput, theme } = useContext(MainContext);
  return (
    <div>
      <Displayer wordsStack={wordSet?.slice(0, 100) || []} />
      <Spacer />
      <Input
        setUserInput={setUserInput}
        userInput={userInput}
        isTimeOut={isGameEnded}
        disabled={disabled}
      />
      <Spacer />
      <KeyBoard theme={theme} enable={isAllow} />
    </div>
  );
}

export default OnGame;

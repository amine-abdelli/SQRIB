import { Spacer } from '@nextui-org/react';
import React, { useContext } from 'react';
import { Displayer } from '../../Displayer/Displayer.component';
import Input from '../../Input/Input.component';
import KeyBoard from '../../KeyBoard/KeyBoard.component';
import { MainContext } from '../../../context/MainContext';

interface OnGameProps {
  wordSet: string[];
  isGameEnded: boolean;
}

function OnGame({ wordSet, isGameEnded }: OnGameProps) {
  const { setUserInput, userInput, theme } = useContext(MainContext);

  // Join room
  // Display number of players
  // Start count down
  // Start game (Update game status) waiting, started, finished
  return (
    <div>
      <Displayer wordsStack={wordSet?.slice(0, 100) || []} />
      <Spacer />
      <Input
        setUserInput={setUserInput}
        userInput={userInput}
        isTimeOut={isGameEnded}
      />
      <Spacer />
      <KeyBoard theme={theme} enable />
    </div>
  );
}

export default OnGame;

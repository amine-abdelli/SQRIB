import { InputGroup } from '@blueprintjs/core';
import React, { ChangeEvent, useContext } from 'react';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import { MainContext } from '../src/context/MainContext';

function Multigaming() {
  const {
    theme, isTimeOut, gameMode, userInput, setUserInput, startCountDown,
  } = useContext(MainContext);
  return (
    <div>
      <Displayer />
      <InputGroup
        style={{ width: '100%' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
        value={userInput}
        asyncControl
        disabled={isTimeOut || gameMode === null}
        large
        placeholder="Commencez à taper ici..."
      />
      <KeyBoard theme={theme} enable={startCountDown && !isTimeOut} />
    </div>
  );
}

export default Multigaming;

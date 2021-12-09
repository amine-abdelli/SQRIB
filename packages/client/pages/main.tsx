import React, {
  useContext, useEffect,
} from 'react';
import { Button } from '@blueprintjs/core';
import { Scoring } from '../src/components/Scoring/Scoring.component';
import { Displayer } from '../src/components/Displayer/Displayer.component';
import KeyBoard from '../src/components/KeyBoard/KeyBoard.component';
import { MainContext } from '../src/context/MainContext';
import DisplayerHeader from '../src/components/DisplayerHeader/DisplayerHeader.component';
import RefreshButton from '../src/components/Buttons/RefreshButton/RefreshButton.component';
import Input from '../src/components/Input/Input.component';
import { useGetSelf } from '../src/hooks/useGetSelf';

function Main({ onSpacePress }: { onSpacePress: (e: any) => void }) {
  const {
    userInput,
    isTimeOut,
    startCountDown,
    setStartCountDown,
    gameMode,
    setUserInput,
    theme,
    setShowModeSelection,
  } = useContext(MainContext);

  useEffect(() => {
    if (userInput && startCountDown === false) {
      setStartCountDown(true);
    }
  }, [userInput]);

  const { data: selfData } = useGetSelf();

  console.log('selfData', selfData);
  return (
    <div style={{ width: '100%' }}>
      <DisplayerHeader />
      {gameMode !== null && <Button outlined style={{ position: 'absolute', top: 200 }} onClick={() => setShowModeSelection(true)}>Changer de mode</Button>}
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <Scoring />
        <RefreshButton />
      </div>
      <div className="flex justify-center">
        <Displayer />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Input
          userInput={userInput}
          setUserInput={setUserInput}
          onSpacePress={onSpacePress}
          gameMode={gameMode}
          isTimeOut={isTimeOut}
        />
      </div>
      <KeyBoard theme={theme} enable={startCountDown && !isTimeOut} />
    </div>
  );
}
export default Main;

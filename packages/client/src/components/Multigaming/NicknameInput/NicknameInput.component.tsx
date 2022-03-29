import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

interface NicknameInputProps {
  setCurrentUser: (nickname: string) => void;
}

function NicknameInput({ setCurrentUser }: NicknameInputProps) {
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [triggerValidation, setTriggerValidation] = useState(false);
  function onNicknameInputValidation() {
    setTriggerValidation(true);
    if (nickname.length > 5 && nickname.length < 20) {
      setCurrentUser(nickname);
    }
  }
  useEffect(() => {
    if (nickname.length < 5) {
      setErrorMessage('Votre pseudo doit contenir au moins 5 caractères');
    } else if (nickname.length > 18) {
      setErrorMessage('Votre pseudo doit contenir au maximum 15 caractères');
    } else {
      setErrorMessage('');
    }
  }, [nickname]);
  return (
    <>
      {triggerValidation && (<p>{errorMessage}</p>)}
      <Input aria-label='Pseudo' onChange={({ target }) => setNickname(target.value)} />
      <Button onClick={onNicknameInputValidation}>Valider</Button>
    </>
  );
}

export default NicknameInput;

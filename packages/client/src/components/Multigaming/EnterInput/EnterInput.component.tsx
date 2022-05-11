import {
  Button, Input, Text,
} from '@nextui-org/react';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

interface EnterInputProps {
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  // userList: string[];
}

function EnterInput({ setUsername }: EnterInputProps) {
  const [nickname, setNickname] = useState<string>('');
  const [storedNickname, setLocalStorageNickname] = useLocalStorage('nickname', nickname);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function onEnterInputValidation() {
    if (nickname.length >= 5 && nickname.length <= 18
    // && !userList.includes(nickname)
    ) {
      setUsername(nickname);
      setLocalStorageNickname(nickname);
    }
  }
  useEffect(() => {
    setNickname(storedNickname);
  }, []);

  useEffect(() => {
    if (nickname.length < 4) {
      setErrorMessage('Votre pseudo doit contenir au moins 4 caractères');
    } else if (nickname.length > 18) {
      setErrorMessage('Votre pseudo doit contenir au maximum 15 caractères');
      // else if (userList.includes(nickname)) {
    // setErrorMessage('Ce pseudo est déjà pris');
    // }
    } else {
      setErrorMessage('');
    }
  }, [nickname]);

  const feedbackType = errorMessage ? 'error' : 'success';

  return (
    <div className='flex flex-column' style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
      <h3 className='text-center'>Choisis ton pseudo</h3>
      {nickname && (
      <div>
        <Text
          color={feedbackType}
          css={{
            backgroundColor: `$${feedbackType}Light`, padding: '5px', margin: '5px 0', borderRadius: '5px', border: `1px solid $${feedbackType}`,
          }}
        >
          {errorMessage || 'Pseudo valide'}
        </Text>
      </div>
      )}
      <Input aria-label='Pseudo' className='w100' value={nickname} onChange={({ target }) => { setNickname(target.value); }} />
      <Button
        shadow
        className='w100'
        onClick={onEnterInputValidation}
      >
        Enregistrer
      </Button>
    </div>
  );
}

export default EnterInput;

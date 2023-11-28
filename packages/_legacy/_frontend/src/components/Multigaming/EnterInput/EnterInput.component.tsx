import { nicknamePolicy } from '@sqrib/utils';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import Button from '../../../UI/Button/Button.component';
import Input from '../../../UI/Input/Input.component';
import { StaticAlertEnum } from '../../../UI/StaticAlert/StaticAlert.props';

interface EnterInputProps {
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  // userList: string[];
}

function EnterInput({ setUsername }: EnterInputProps) {
  const [nickname, setNickname] = useState<string>('');
  const [storedNickname, setLocalStorageNickname] = useLocalStorage('nickname', nickname);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function onEnterInputValidation() {
    if (nickname.length >= 5 && nickname.length <= 18) {
      setUsername(nickname);
      setLocalStorageNickname(nickname);
    }
  }
  useEffect(() => {
    setNickname(storedNickname);
  }, []);

  useEffect(() => {
    if (nickname.length < 4) {
      setErrorMessage('Votre pseudo doit contenir au moins 4 caractères !');
    } else if (nickname.length > 18) {
      setErrorMessage('Votre pseudo doit contenir au maximum 15 caractères !');
    } else if (!new RegExp(nicknamePolicy).test(nickname)) {
      setErrorMessage('Votre pseudo ne peut contenir que des lettres, chiffres, tirets et tirets du bas uniquement.');
    } else {
      setErrorMessage('');
    }
  }, [nickname]);

  const feedbackType = errorMessage ? StaticAlertEnum.ERROR : StaticAlertEnum.SUCCESS;
  return (
    <div className='flex flex-column' style={{ width: '100%', justifyContent: 'center' }}>
      <h3 className='text-center'>Choisis ton pseudo</h3>
      <Input
        helperColor={feedbackType}
        helperText={errorMessage || ''}
        aria-label='Pseudo'
        value={nickname}
        onChange={({ target }) => { setNickname(target.value); }}
      />
      <Button
        onClick={onEnterInputValidation}
        text="Enregistrer"
      />
    </div>
  );
}

export default EnterInput;

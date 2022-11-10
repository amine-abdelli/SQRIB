import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN_MUTATION } from '@sqrib/api';
import { Text } from '@nextui-org/react';
import { emailPolicy } from '@sqrib/utils';
import { LoginProps } from './Login.props';
import Modal from '../../UI/Modal/Modal.component';
import Button from '../../UI/Button/Button.component';
import Logo from '../Logo/Logo.component';
import Input from '../../UI/Input/Input.component';
import Spacer from '../../UI/Spacer/Spacer.component';

function Login({ open, setOpen }: LoginProps) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState({ email: '', password: '' });
  const [isAuthWrong, setIsAuthWrong] = useState(false);
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const [submitLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: (error) => {
      setIsAuthWrong(Boolean(error.message));
    },
  });

  useEffect(() => {
    setIsValid({
      email: login.email.match(emailPolicy) ? '' : 'E-mail invalide',
      password: login.password.length < 8 ? 'Votre mot de passe doit contenir au moins 8 caractères' : '',
    });
    setIsAuthWrong(false);
  }, [login.email, login.password]);

  const onFinish = () => {
    setTriggerLoginChecking(true);
    if (isValid && login.password && login.email.match(emailPolicy)) {
      setLogin({ email: '', password: '' });
      setTriggerLoginChecking(false);
      submitLogin({
        variables: {
          ...login,
          email: login?.email.trim(),
        },
      });
    }
  };

  return (
    <Modal
      closeable
      blur
      isOpen={open}
      darkCross
      setIsOpen={() => setOpen(false)}
    >
      <Modal.Header>
        <h1
          style={{
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Logo />
        </h1>
      </Modal.Header>
      <Modal.Body style={{ width: '20rem' }}>
        {isAuthWrong && (
        <Text style={{ textAlign: 'center', marginBottom: '5px' }} color='error'>
          L&apos;e-mail ou le mot de passe saisie est incorrecte
        </Text>
        )}
        <Input
          type='email'
          placeholder='john.doe@sqrib.io'
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          value={login.email}
          helperText={triggerLoginChecking && isValid.email ? 'Veuillez saisir une adresse e-mail valide' : ''}
        />
        <Input
          type='password'
          placeholder='Mot de passe'
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          value={login.password}
        />
      </Modal.Body>
      <Modal.Footer style={{ width: '20rem' }}>
        <Button text="Se connecter" onClick={onFinish} />
        <Spacer h='10' />
        <Button text="Mot de passe oublié ?" secondary onClick={onFinish} />
      </Modal.Footer>
    </Modal>
  );
}

export default Login;

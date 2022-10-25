import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN_MUTATION } from '@sqrib/api';
import {
  Text, Input, Spacer,
} from '@nextui-org/react';
import { emailPolicy } from '@sqrib/utils';
import { Message, Lock } from 'react-iconly';
import { LoginProps } from './Login.props';
import Modal from '../../UI/Modal/Modal.component';
import Button from '../../UI/Button/Button.component';
import Logo from '../Logo/Logo.component';

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

  function onInputChangeColor(key: 'email' | 'password') {
    if (triggerLoginChecking && isValid[key]) {
      return 'error';
    } if (triggerLoginChecking && !isValid[key]) {
      return 'success';
    }
    return 'primary';
  }

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
          placeholder="e-mail"
          bordered
          value={login.email}
          fullWidth
          color={onInputChangeColor('email')}
          size="lg"
          type="email"
          helperColor="error"
          contentLeft={<Message />}
          helperText={triggerLoginChecking && isValid.email ? 'Veuillez saisir une adresse e-mail valide' : ''}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <div style={{ height: '20px' }} />
        {triggerLoginChecking && isValid.email && <Spacer y={0.1} />}
        <Input
          placeholder="mot de passe"
          value={login.password}
          bordered
          fullWidth
          helperColor='error'
          helperText={triggerLoginChecking && isValid.password ? 'Votre mot de passe doit contenir au moins 8 caractères' : ''}
          color={onInputChangeColor('password')}
          size="lg"
          type="password"
          contentLeft={<Lock />}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button text="Se connecter" onClick={onFinish} />
        <Button text="Mot de passe oublié ?" secondary onClick={onFinish} />
      </Modal.Footer>
    </Modal>
  );
}

export default Login;

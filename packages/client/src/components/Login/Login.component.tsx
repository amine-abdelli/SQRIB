import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN_MUTATION } from '@aqac/api';
import {
  Modal, Row, Text, Input, Button, Spacer,
} from '@nextui-org/react';
import { emailPolicy } from '@aqac/utils';
import { Message, Lock } from 'react-iconly';
import { LoginProps } from './Login.props';

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
      closeButton
      className='p2r'
      open={open}
      onClose={() => setOpen(false)}
      blur
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          {' '}
          <Text b size={18}>
            AQAYC
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
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
        <Row justify="space-between">
          <Text size={14}>
            Mot de passe oublié?
          </Text>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto type='submit' onClick={onFinish}>
          Se connecter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;

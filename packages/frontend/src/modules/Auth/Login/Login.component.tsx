
import React, { useEffect, useState } from 'react';
import { Text } from '@nextui-org/react';
import { emailPolicy } from '@sqrib/shared';
import Modal from '../../../components/Modal/Modal.component';
import { Logo, Spacer, SpacerSize } from '../../../components';
import { Button } from '../../../components/Button/Button.component';
import { Input } from '../components/Input/Input.component';
import { useLogin } from '../../../api/queries/useLogin.hook';


function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState({ email: '', password: '' });
  const [isAuthWrong, setIsAuthWrong] = useState(false);
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const { mutateAsync: loginUser } = useLogin({
    onSuccess(data, variables, context) {
      window.location.reload()
    },
    onError(error, variables, context) {
      // Notification here
    }
  })

  useEffect(() => {
    setIsValid({
      email: login.email.match(emailPolicy) ? '' : 'E-mail invalide',
      password: login.password.length < 8 ? 'Votre mot de passe doit contenir au moins 8 caractères' : '',
    });
    setIsAuthWrong(false);
  }, [login.email, login.password]);

  const onFinish = async () => {
    setTriggerLoginChecking(true);
    if (isValid && login.password && login.email.match(emailPolicy)) {
      setLogin({ email: '', password: '' });
      setTriggerLoginChecking(false);
      await loginUser(login)
    }
  };

  return (
    <>
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
          <Logo label='SQRIB.IO' />
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
          placeholder='Password'
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          value={login.password}
        />
      </Modal.Body>
      <Modal.Footer style={{ width: '20rem' }}>
        <Button label="Login" onClick={onFinish} />
        <Spacer y size={SpacerSize.SMALL} />
        {/* <Button light label="Forgotten password ?" color='blue' secondary onClick={() => null} /> */}
      </Modal.Footer>
    </>
  );
}

export { Login };

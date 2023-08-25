
import React, { useEffect, useState } from 'react';
import Modal from '../../../components/Modal/Modal.component';
import { Logo, Spacer, SpacerSize } from '../../../components';
import { Button } from '../../../components/Button/Button.component';
import { Input } from '../components/Input/Input.component';
import { useLogin } from '../../../api/queries';
import { alertService } from '../../Alert/Alert.service';
import { formatErrorMessage } from '../../../utils';
import { MODAL_ID } from '../../../components/Modals/modals.constants';
import { useModal } from '../../../contexts/ModalContext';

function Login() {
  const [login, setLogin] = useState({
    // Can be email or username
    email: '',
    password: ''
  });
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const { closeModal } = useModal()
  const { mutateAsync: loginUser } = useLogin({
    onSuccess(data, variables, context) {
      setLogin({ email: '', password: '' });
      setTriggerLoginChecking(false);
      closeModal(MODAL_ID.LOGIN)
      alertService.success('You\'ve been successfully logged in :) !', {});
      // ! FIX RELOADING THING
      window.location.reload()
    },
    onError(error, variables, context) {
      alertService.error(formatErrorMessage(error), {});
    }
  })

  const onFinish = async () => {
    setTriggerLoginChecking(true);
    if (login.password && login.email) {
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
        {/* Can be email or username */}
        <Input
          type='email'
          placeholder='Your email or username'
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          value={login.email}
          helperText={triggerLoginChecking ? 'Veuillez saisir une adresse e-mail valide' : ''}
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

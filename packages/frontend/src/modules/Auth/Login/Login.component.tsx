
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Modal from '../../../components/Modal/Modal.component';
import { Spacer, SpacerSize } from '../../../components';
import { Button } from '../../../components/Button/Button.component';
import { Input } from '../components/Input/Input.component';
import { useLogin } from '../../../api/queries';
import { formatErrorMessage } from '../../../utils';
import { MODAL_ID } from '../../../components/Modals/modals.constants';
import { useModal } from '../../../contexts/ModalContext';
import { Text } from '../../../components/Text/Text.component';
import { COLORS } from '../../../theme/colors';
import { validateInput } from '../../../utils/form.utils';

function Login() {
  // Can be email or username
  const [login, setLogin] = useState({ email: '', password: '' });
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const { closeModal, openModal } = useModal()
  const { mutateAsync: loginUser } = useLogin({
    onSuccess() {
      setLogin({ email: '', password: '' });
      setTriggerLoginChecking(false);
      closeModal(MODAL_ID.LOGIN)
      toast.success('You\'ve been successfully logged in 🚀 !')
      window.location.reload()
    },
    onError(error) {
      toast.error(formatErrorMessage(error));
    }
  })

  const handleSignupClick = () => {
    openModal(MODAL_ID.SIGNUP)
    closeModal(MODAL_ID.LOGIN)
  }

  const onFinish = async () => {
    setTriggerLoginChecking(true);
    if (login.password && login.email) {
      await loginUser(login)
    }
  };

  return (
    <>
      <Modal.Header>
        <Text h1 bold centered color={COLORS.GOLD}>
          WELCOME BACK
        </Text>
        <Text thin centered>
          Let's get you signed in.
        </Text>
      </Modal.Header>
      <Modal.Body style={{ width: '20rem' }}>
        {/* Can be email or username */}
        <Input
          label='Email Address or Username'
          name="email"
          type='email'
          placeholder='e.g. john_doe@sqrib.io or john_doe'
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          value={login.email}
          helperText={triggerLoginChecking ? 'Veuillez saisir une adresse e-mail valide' : ''}
        />
        <Input
          label='Password'
          name='password'
          type='password'
          // placeholder='password' // TODO ADD A PADLOCK IN PASSWORD PLACEHOLDER ON THE LEFT
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          onKeyDown={(e) => validateInput(e, onFinish)}
          value={login.password}
        />
      </Modal.Body>
      <Modal.Footer style={{ width: '20rem' }}>
        <Button label="Login" onClick={onFinish} />
        <Spacer y size={SpacerSize.MEDIUM} />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text italic size={14}>Don't have an account?</Text><Button stretch link onClick={handleSignupClick}>Sign Up!</Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export { Login };

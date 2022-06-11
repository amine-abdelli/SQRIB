import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@aqac/api';
import {
  Input, Button, Spacer, Modal,
} from '@nextui-org/react';
import { alertService } from '../../../services';
import { onFormChange } from '../../utils/form';
import { LoginProps } from '../Login/Login.props';

function Signup({ open, setOpen }: LoginProps) {
  const [submitSignupForm] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      alertService.success('Votre compte a bien été créé', { keepAfterRouteChange: true });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: () => {
      alertService.success('Une erreur est survenue lors de la création de votre compte', {});
    },
  });
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    retypedPassword: '',
  });

  function onFormSubmit() {
    submitSignupForm({
      variables: {
        email: signupForm.email,
        nickname: signupForm.username,
        password: signupForm.password,
      },
    });
  }

  function onPasswordInputChange() {
    if (signupForm.password.length === 0 && signupForm.retypedPassword.length === 0) {
      return 'primary';
    }
    if ((signupForm.password !== signupForm.retypedPassword)
      && signupForm.password.length > 0 && signupForm.retypedPassword.length > 0) {
      return 'error';
    }
    if (signupForm.password === signupForm.retypedPassword) {
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
      <h1 style={{ textAlign: 'center' }}>Inscription</h1>
      <Input
        onChange={(e) => onFormChange(e.target.value, 'username', setSignupForm, signupForm)}
        placeholder="username"
        fullWidth
        color="primary"
        bordered
        size='lg'
        type="userName"
      />
      <Spacer />
      <Input
        type="email"
        onChange={(e) => onFormChange(e.target.value, 'email', setSignupForm, signupForm)}
        placeholder="john.doe@domain.com"
        fullWidth
        color="primary"
        bordered
        size='lg'
      />
      <Spacer />
      <Input.Password
        color={signupForm.password === signupForm.retypedPassword && signupForm.retypedPassword.length > 8 ? 'success' : 'primary'}
        onChange={(e) => onFormChange(e.target.value, 'password', setSignupForm, signupForm)}
        type="password"
        placeholder="mot de passe"
        fullWidth
        bordered
        size='lg'
      />
      <Spacer />
      <Input.Password
        color={onPasswordInputChange()}
        onChange={(e) => onFormChange(e.target.value, 'retypedPassword', setSignupForm, signupForm)}
        type="password"
        placeholder="confirmer mot de passe"
        fullWidth
        bordered
        size='lg'
      />
      {signupForm.password !== signupForm.retypedPassword && signupForm.retypedPassword.length > 6
        && <span style={{ color: 'red', fontWeight: 'lighter' }}>vos deux mots de passe doivent être identiques</span>}
      <Spacer />
      <Button auto style={{ marginLeft: 'auto' }} onClick={onFormSubmit} color="primary">S&apos;inscrire</Button>
    </Modal>
  );
}

export default Signup;

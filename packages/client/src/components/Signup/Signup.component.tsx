import React, { useState } from 'react';
import {
  Button, Divider, FormGroup, InputGroup,
} from '@blueprintjs/core';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@aqac/api';

function Signup() {
  const [submitSignupForm] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.log('poke', error);
    },
  });
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    retypedPassword: '',
  });

  function onFormChange(event: any, formKey: string) {
    setSignupForm({ ...signupForm, [formKey]: event.target.value });
  }

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
      return 'none';
    }
    if ((signupForm.password !== signupForm.retypedPassword)
    && signupForm.password.length > 0 && signupForm.retypedPassword.length > 0) {
      return 'danger';
    }
    if (signupForm.password === signupForm.retypedPassword) {
      return 'success';
    }
    return 'none';
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Inscription</h1>
      <FormGroup>
        <InputGroup
          style={{ marginBottom: '10px' }}
          onChange={(e) => onFormChange(e, 'username')}
          placeholder="username"
        />
        <InputGroup
          style={{ marginBottom: '10px' }}
          type="email"
          onChange={(e) => onFormChange(e, 'email')}
          placeholder="john.doe@domain.com"
        />
        <InputGroup
          style={{ marginBottom: '10px' }}
          intent={signupForm.password === signupForm.retypedPassword && signupForm.retypedPassword.length > 8 ? 'success' : 'none'}
          onChange={(e) => onFormChange(e, 'password')}
          type="password"
          placeholder="mot de passe"
        />
        <InputGroup
          style={{ marginBottom: '10px' }}
          intent={onPasswordInputChange()}
          onChange={(e) => onFormChange(e, 'retypedPassword')}
          type="password"
          placeholder="confirmer mot de passe"
        />
        {signupForm.password !== signupForm.retypedPassword && signupForm.retypedPassword.length > 0
        && <span style={{ color: 'red', fontWeight: 'lighter' }}>vos deux mots de passe doivent être identiques</span>}
        <Divider />
        <Button onClick={onFormSubmit} fill intent="primary" text="s'inscrire" />
      </FormGroup>
    </>
  );
}

export default Signup;

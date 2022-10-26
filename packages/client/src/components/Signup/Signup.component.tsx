import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@sqrib/api';
import { emailPolicy, nicknamePolicy, passwordPolicy } from '@sqrib/utils';
import { alertService } from '../../../services';
import { onFormChange } from '../../utils/form';
import { LoginProps } from '../Login/Login.props';
import Modal from '../../UI/Modal/Modal.component';
import Input from '../../UI/Input/Input.component';
import Button from '../../UI/Button/Button.component';
import Logo from '../Logo/Logo.component';

function Signup({ open, setOpen }: LoginProps) {
  const [isValid, setIsValid] = useState({
    nickname: false, email: false, password: false, retypedPassword: false,
  });
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
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const [signupForm, setSignupForm] = useState({
    nickname: '',
    email: '',
    password: '',
    retypedPassword: '',
  });
  useEffect(() => {
    setIsValid({
      nickname: new RegExp(nicknamePolicy).test(signupForm.nickname),
      email: new RegExp(emailPolicy).test(signupForm.email),
      password: new RegExp(passwordPolicy).test(signupForm.password),
      retypedPassword: signupForm.password === signupForm.retypedPassword,
    });
  }, [signupForm]);
  const onFormSubmit = () => {
    setTriggerLoginChecking(true);
    if (Object.values(isValid).every(Boolean)) {
      console.log('isValid', Object.values(isValid).every(Boolean));
      setSignupForm({
        nickname: '',
        email: '',
        password: '',
        retypedPassword: '',
      });
      setTriggerLoginChecking(false);
      submitSignupForm({
        variables: {
          email: signupForm.email,
          nickname: signupForm.nickname,
          password: signupForm.password,
        },
      });
    }
  };
  console.log('signupForm', signupForm);
  return (
    <Modal
      closeable
      isOpen={open}
      setIsOpen={() => setOpen(false)}
      blur
      darkCross
    >
      <Modal.Header style={{ width: '20rem' }}>
        <Logo />
        <p style={{ margin: 0, padding: 0, fontStyle: 'italic' }}>
          Inscrivez vous pour visualiser votre progression et vous comparer aux autres joueurs.
        </p>
      </Modal.Header>
      <Modal.Body style={{ width: '20rem' }}>
        <Input
          name="nickname"
          onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
          placeholder="Choisissez un pseudo"
          helperColor='error'
          helperText={triggerLoginChecking && !isValid.nickname ? 'Lettres, chiffres, tirets et tirets du bas uniquement.' : ''}
        />
        <Input
          type="email"
          name="email"
          onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
          placeholder="Entrez une adresse e-mail valide"
          helperColor='error'
          helperText={triggerLoginChecking && !isValid.email ? 'Veuillez saisir une adresse e-mail valide.' : ''}
        />
        <Input
          onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
          type="password"
          name="password"
          placeholder="mot de passe"
          helperColor='error'
          helperText={triggerLoginChecking && !isValid.password ? 'Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un caractère spécial et un chiffre.' : ''}
        />
        <Input
          onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
          type="password"
          name="retypedPassword"
          placeholder="confirmer mot de passe"
          helperColor='error'
          helperText={triggerLoginChecking && !isValid.retypedPassword ? 'Vos deux mots de passe doivent être identiques.' : ''}
        />
      </Modal.Body>
      <Modal.Footer style={{ width: '20rem' }}>
        <Button text="S'INSCRIRE" onClick={onFormSubmit} />
      </Modal.Footer>
    </Modal>
  );
}

export default Signup;

import React, { useEffect, useState } from 'react';
import { emailPolicy, passwordPolicy, usernamePolicy } from '@sqrib/shared';
import Modal from '../../../components/Modal/Modal.component';
import { Logo, Spacer, SpacerSize } from '../../../components';
import { onFormChange } from '../../../utils/form.utils';
import { Input } from '../components';
import { Button } from '../../../components/Button/Button.component';
import { Text } from '../../../components/Text/Text.component';
import { useCreateUser } from '../../../api/queries/userCreateAccount.hooks';
import { useModal } from '../../../contexts/ModalContext';
import { MODAL_ID } from '../../../components/Modals/modals.constants';
import { AxiosError } from 'axios';
import { alertService } from '../../Alert/Alert.service';
import { formatErrorMessage } from '../../../utils';

function Signup() {
  const [isValid, setIsValid] = useState({
    username: false, email: false, password: false, retypedPassword: false,
  });
  const [triggerLoginChecking, setTriggerLoginChecking] = useState(false);
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
    retypedPassword: '',
  });
  const { closeModal, openModal } = useModal()
  const { mutateAsync: submitUserSubscription } = useCreateUser({
    onSuccess(data, variables) {
      setSignupForm({ username: '', email: '', password: '', retypedPassword: '' })
      setTriggerLoginChecking(false)
      alertService.success('You\'ve been successfully signed up', { keepAfterRouteChange: true });
      closeModal(MODAL_ID.SIGNUP)
      openModal(MODAL_ID.LOGIN)
    },
    onError(error, variables, context) {
      const axiosError = error as AxiosError
      setSignupForm({ username: '', email: '', password: '', retypedPassword: '' })
      alertService.error(formatErrorMessage(axiosError), { keepAfterRouteChange: true });
      // Trigger notification message
    }
  })


  useEffect(() => {
    setIsValid({
      username: new RegExp(usernamePolicy).test(signupForm.username),
      email: new RegExp(emailPolicy).test(signupForm.email),
      password: new RegExp(passwordPolicy).test(signupForm.password),
      retypedPassword: signupForm.password === signupForm.retypedPassword,
    });
  }, [signupForm]);

  const onFormSubmit = async () => {
    setTriggerLoginChecking(true);
    if (Object.values(isValid).every(Boolean)) {
      setSignupForm({
        username: '',
        email: '',
        password: '',
        retypedPassword: '',
      });
      setTriggerLoginChecking(false);
      await submitUserSubscription(signupForm)
    }
  };

  return (
    <div style={{ width: '20rem' }}>
      <Modal.Header>
        <Logo label='SQRIB.IO' />
        <Spacer y size={SpacerSize.SMALL} />
        <Text size={14} p thin italic>
          Level up your typing skills and signup to save your in-game triumphs, challenge the best, and unlock next-level experiences
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input
            name="username"
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            placeholder="Choose a username"
            helperColor={(triggerLoginChecking && (!isValid.username ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.username ? 'Lettres, chiffres, tirets et tirets du bas uniquement.' : '')}
          />
          <Input
            type="email"
            name="email"
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            placeholder="Enter a valid email address"
            helperColor={(triggerLoginChecking && (!isValid.email ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.email ? 'Veuillez saisir une adresse e-mail valide.' : '')}
          />
          <Input
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            type="password"
            name="password"
            placeholder="Password"
            helperColor={(triggerLoginChecking && (!isValid.password ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.password ? 'Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un caractère spécial et un chiffre.' : '') as string}
          />
          <Input
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            type="password"
            name="retypedPassword"
            placeholder="Confirm password"
            helperColor={(triggerLoginChecking && (!isValid.retypedPassword ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.retypedPassword ? 'Vos deux mots de passe doivent être identiques.' : '') as string}
          />
        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onFormSubmit}>Signup</Button>
      </Modal.Footer>
    </div>
  );
}

export { Signup };

import React, { useEffect, useState } from 'react';
import { emailPolicy, passwordPolicy, usernamePolicy } from '@sqrib/shared';
import Modal from '../../../components/Modal/Modal.component';
import { Spacer, SpacerSize } from '../../../components';
import { onFormChange, validateInput } from '../../../utils/form.utils';
import { Input } from '../components';
import { Button } from '../../../components/Button/Button.component';
import { Text } from '../../../components/Text/Text.component';
import { useCreateUser } from '../../../api/queries';
import { useModal } from '../../../contexts/ModalContext';
import { MODAL_ID } from '../../../components/Modals/modals.constants';
import { alertService } from '../../Alert/Alert.service';
import { formatErrorMessage } from '../../../utils';
import { COLORS } from '../../../theme/colors';
import { generateRandomUsername } from '../../../utils/username.util';
import { LuRefreshCcw } from 'react-icons/lu';

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
    onError(error) {
      setSignupForm({ username: '', email: '', password: '', retypedPassword: '' })
      alertService.error(formatErrorMessage(error), { keepAfterRouteChange: true });
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
        <Text h3 bold>Unleash Your Typing Potential</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <Text size={14} p thin italic>
          Level up your typing skills and signup to save your in-game triumphs, challenge the best, and unlock next-level experiences.
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Input
              name="username"
              label="Username"
              onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
              value={signupForm.username}
              placeholder="e.g john_doe"
              helperColor={(triggerLoginChecking && (!isValid.username ? 'error' : 'success')) as string}
              helperText={triggerLoginChecking && (!isValid.username ? 'Lettres, chiffres, tirets et tirets du bas uniquement.' : '')}
              style={{ width: '100%' }}
            />
            <Button stretch light style={{ alignSelf: 'flex-end', marginBottom: '10px' }} onClick={() => setSignupForm({ ...signupForm, username: generateRandomUsername() })}>
              <LuRefreshCcw color={COLORS.BLACK} size={24} />
            </Button>
          </div>
          <Input
            type="email"
            name="email"
            label='Email Address'
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            placeholder="e.g john_doe@sqrib.io"
            helperColor={(triggerLoginChecking && (!isValid.email ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.email ? 'Veuillez saisir une adresse e-mail valide.' : '')}
          />
          <Input
            label='Password'
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            type="password"
            name="password"
            helperColor={(triggerLoginChecking && (!isValid.password ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.password ? 'Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un caractère spécial et un chiffre.' : '') as string}
          />
          <Input
            label='Confirm Password'
            onChange={(event) => onFormChange(event, setSignupForm, signupForm)}
            type="password"
            name="retypedPassword"
            helperColor={(triggerLoginChecking && (!isValid.retypedPassword ? 'error' : 'success')) as string}
            helperText={triggerLoginChecking && (!isValid.retypedPassword ? 'Vos deux mots de passe doivent être identiques.' : '') as string}
            onKeyDown={(e) => validateInput(e, onFormSubmit)}
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

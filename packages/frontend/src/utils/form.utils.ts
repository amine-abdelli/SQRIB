import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface SignupFormProps {
  username: string; email: string; password: string; retypedPassword: string;
}
export function onFormChange(
  event: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<SignupFormProps>>,
  form: SignupFormProps,
) {
  setState({ ...form, [event.target.name]: event.target.value });
}

export function validateInput(e: React.KeyboardEvent<HTMLInputElement>, cb: () => void) {
  if (e.key === 'Enter') {
    cb()
  }
}
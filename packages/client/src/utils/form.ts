import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface SignupFormProps {
   nickname: string; email: string; password: string; retypedPassword: string;
}
export function onFormChange(
  event: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<SignupFormProps>>,
  form: SignupFormProps,
) {
  console.log(event);
  setState({ ...form, [event.target.name]: event.target.value });
}

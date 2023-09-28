import React from 'react'
import { Text } from '../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../components'
import { Input } from '../../Auth/components'
import { Button } from '../../../components/Button/Button.component'
import Notification from '../../../components/Notification/Notification.component'
import { useUpdatePassword } from '../../../api/queries/useUpdatePassword.hook'
import { alertService } from '../../Alert/Alert.service'
import { passwordPolicy } from '@sqrib/shared'
import { formatErrorMessage } from '../../../utils'

const EditPassword = () => {
  const [oldPassword, setOldPassword] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const { mutateAsync: updateUserPassword } = useUpdatePassword({
    onSuccess: () => {
      alertService.success('Password updated successfully.', {})
    },
    onError: (err) => {
      setError(formatErrorMessage(err));
    }
  })

  async function updatePassword() {
    if (!oldPassword || !password || !confirmPassword) return setError('Please fill all fields')
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (passwordPolicy.test(password) === false) return setError('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character')
    await updateUserPassword({ oldPassword, newPassword: password, newPasswordConfirm: confirmPassword })
    setError('');
    setOldPassword('')
    setPassword('')
    setConfirmPassword('')
  }
  const isDisabled = !oldPassword || !password || !confirmPassword;
  return (
    <section className='edit-page-edit-password--wrapper'>
      <Text fira h2 bold>Change Password</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      {error && <Notification message={error} type='error' />}
      <div className='edit-page-edit-password'>
        <div className='change-password--inputs'>
          <Input type='password' label='Old password' name='Old password' stretch onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
          <Input type='password' label='New password' name='New password' stretch onChange={(e) => setPassword(e.target.value)} value={password} />
          <Input type='password' label='Confirm Password' name='Confirm Password' stretch onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button
          disabled={isDisabled}
          secondary
          style={{ height: '45px', margin: '1rem 0', width: '10rem' }}
          stretch
          onClick={updatePassword}
        >
          Save changes
        </Button>
      </div>
    </section>
  )
}

export { EditPassword }
import React from 'react'
import { Text } from '../../../../../components/Text/Text.component'
import { Button } from '../../../../../components/Button/Button.component'
import { Spacer, SpacerSize } from '../../../../../components'
import { useDeleteAccount } from '../../../../../api/queries/useDeleteAccount.hook'
import { Input } from '../../../../Auth/components'
import { MAIN_ROUTES } from '../../../../../routes/paths'
import { alertService } from '../../../../Alert/Alert.service'
import { formatErrorMessage } from '../../../../../utils'
import { useModal } from '../../../../../contexts'
import { MODAL_ID } from '../../../../../components/Modals/modals.constants'

const DeleteAccountConfirm = () => {
  const [password, setPassword] = React.useState('')
  const { closeModal } = useModal()
  const { mutateAsync: deleteAccount } = useDeleteAccount({
    onSuccess() {
      alertService.success('Account deleted successfully.', {})
      window.location.href = MAIN_ROUTES.HOME
    },
    onError(err) {
      alertService.error(formatErrorMessage(err), {})
      setPassword('')
      closeModal(MODAL_ID.CONFIRM_DELETE_ACCOUNT)
    }
  })

  async function handleDeleteAccount() {
    if (password) {
      await deleteAccount({ password })
    }
  }

  return (
    <div>
      <Text h3 bold fira>Are you sure you wanna delete your account ?</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <Text fira>Once you delete your account, there is no going back. If you want to go further please</Text>{" "}<Text fira bold>input your password.</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <Input name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <Button onClick={handleDeleteAccount}>Yes, delete my account</Button>
    </div>
  )
}

export { DeleteAccountConfirm }
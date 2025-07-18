import React from 'react'
import toast from 'react-hot-toast'

import { MovingBackground } from '../components/MovingBackground/MovingBackground.component'
import { GoToButton } from '../components/HomeButton/HomeButton.component'
import { Text } from '../components/Text/Text.component'
import { useGetUser } from '../api/queries'
import Loading from './Loading.page'
import { AvatarSection } from '../modules/EditProfile/AvatarSection/AvatarSection.component'
import { BioSection } from '../modules/EditProfile/BioSection/BioSection.component'
import { EditPassword } from '../modules/EditProfile/EditPasswordSection/EditPassword.component'
import { DeleteAccountSection } from '../modules/EditProfile/DeleteAccountSection/DeleteAccountSection.component'
import { useUpdateUser } from '../api/queries/useUpdateUser.hook'
import { useModal } from '../contexts'
import { MODAL_ID } from '../components/Modals/modals.constants'

import '../theme/pages/_EditProfile.scss'

document.title = 'Edit profile';

const EditProfile = () => {
  const { data, isLoading, refetch } = useGetUser();
  const { closeModal } = useModal()
  const { mutateAsync } = useUpdateUser({
    onSuccess: () => {
      refetch()
      toast.success('Avatar updated successfully.')
      closeModal(MODAL_ID.AVATAR_COLOR)
      closeModal(MODAL_ID.AVATAR_CROP)
    },
    onError: () => {
      toast.error('An error occured while updating avatar.')
    }
  })

  if (isLoading) return <Loading />
  const username = data?.data?.username;
  const color = data?.data?.color;
  const bio = data?.data?.description;
  const avatarUrl = data?.data?.avatar ?? '';
  return (
    <main className='layout--main edit-page-container--wrapper'>
      <MovingBackground />
      <div className='back-button'>
        <GoToButton />
      </div>
      <div className='edit-page-container'>
        <Text h1>Edit profile</Text>
        <AvatarSection username={username} color={color} updateUser={mutateAsync} avatarUrl={avatarUrl} />
        <BioSection bio={bio ?? ''} onBioSave={mutateAsync} />
        <EditPassword />
        <DeleteAccountSection />
      </div>
    </main>
  )
}

export default EditProfile
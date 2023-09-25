import React from 'react'
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component'
import { BackButton } from '../components/HomeButton/HomeButton.component'
import { Text } from '../components/Text/Text.component'
import { useGetUser } from '../api/queries'
import Loading from './Loading.page'
import { AvatarSection } from '../modules/EditProfile/AvatarSection/AvatarSection.component'
import { BioSection } from '../modules/EditProfile/BioSection/BioSection.component'
import { EditPassword } from '../modules/EditProfile/EditPasswordSection/EditPassword.component'
import { DeleteAccountSection } from '../modules/EditProfile/DeleteAccountSection/DeleteAccountSection.component'

import '../theme/pages/_EditProfile.scss'

const EditProfile = () => {
  const { data, isLoading } = useGetUser();
  if (isLoading) return <Loading />
  const username = data?.data?.username;
  const color = data?.data?.color;
  return (
    <main className='layout--main edit-page-container--wrapper'>
      <MovingBackground />
      <div className='back-button'>
        <BackButton />
      </div>
      <div className='edit-page-container'>
        <Text h1>Edit profile</Text>
        <AvatarSection username={username} color={color} />
        <BioSection />
        <EditPassword />
        <DeleteAccountSection />
      </div>
    </main>
  )
}

export default EditProfile
import React from 'react'
import { UseMutateAsyncFunction } from 'react-query';
import { UpdateUserRequestBody, UserBase } from '@sqrib/shared';

import { Text } from '../../../components/Text/Text.component';
import Avatar from '../../../components/Avatar/Avatar.component';
import { Spacer, SpacerSize } from '../../../components';
import { Button } from '../../../components/Button/Button.component';
import { useWindowSize } from '../../../hooks';
import { useModal } from '../../../contexts';
import { MODAL_ID } from '../../../components/Modals/modals.constants';
import { AvatarColorPicker } from './AvatarColorPicker';
import { ModalDef } from '../../../components/Modal/ModalDef/ModalDef.component';
import { AvatarCrop, deleteAvatarFromBucket } from './AvatarCrop/AvatarCrop.component';
import { extractFilename } from '../utils/extractFileName.util';
import { COLORS } from '../../../theme/colors';
import { AvatarDeletion } from './AvatarCrop/subComponent/AvatarDeletion.component';

import "cropperjs/dist/cropper.css";

interface AvatarSectionProps {
  username?: string,
  color?: string,
  updateUser: UseMutateAsyncFunction<UserBase, unknown, UpdateUserRequestBody, unknown>,
  avatarUrl?: string,
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ username, color, updateUser, avatarUrl }) => {
  const { openModal, closeModal } = useModal()
  const { isSmallScreen } = useWindowSize()

  async function deleteAvatar() {
    if (avatarUrl) {
      await deleteAvatarFromBucket(extractFilename(avatarUrl) ?? '')
      await updateUser({ avatar: null as unknown as undefined })
      closeModal(MODAL_ID.CONFIRM_AVATAR_DELETION)
    }
  }
  return (
    <section className='edit-page-avatar--wrapper'>
      <Text fira h2 bold>Avatar</Text>
      <div className='edit-page-avatar'>
        <div style={{ position: 'relative' }}>
          {avatarUrl && <Button onClick={() => openModal(MODAL_ID.CONFIRM_AVATAR_DELETION)} style={{ position: 'absolute', padding: '0.75rem', borderRadius: '50px', background: COLORS.VERY_LIGHT_GREY, width: '0.75rem', height: '0.75rem', right: '-8.5px', top: '-7px' }} stretch light>&#10006;</Button>}
          {username && color && <Avatar avatarUrl={avatarUrl} size='xxlarge' color={color} username={username} />}
        </div>
        <Spacer x size={SpacerSize.LARGE} />
        <div className='upload-elements' style={isSmallScreen ? { width: '10rem', padding: '1rem' } : {}}>
          <Button disabled={!!avatarUrl} className='upload-button' onClick={() => openModal(MODAL_ID.AVATAR_COLOR)} stretch secondary>{`Change ${isSmallScreen ? '' : 'avatar'} color`}</Button>
          <Button className='upload-button' onClick={() => openModal(MODAL_ID.AVATAR_CROP)} stretch>{isSmallScreen ? 'Upload' : 'Upload new avatar'}</Button>
          <Spacer y size={SpacerSize.SMALL} />
          <Text fira>jpg or png is allowed</Text>
        </div>
      </div>
      {username && color && <ModalDef id={MODAL_ID.AVATAR_COLOR} component={<AvatarColorPicker username={username} color={color} onColorSave={updateUser} />} />}
      {<ModalDef id={MODAL_ID.AVATAR_CROP} component={<AvatarCrop updateUser={updateUser} avatarUrl={avatarUrl} userColor={color ?? ''} />} />}
      {<ModalDef id={MODAL_ID.CONFIRM_AVATAR_DELETION} component={<AvatarDeletion deleteAvatar={deleteAvatar} />} />}
    </section>
  )
}

export { AvatarSection };
import React from 'react';
import Cropper from 'react-cropper';
import toast from 'react-hot-toast';
import { UseMutateAsyncFunction } from 'react-query';
import { UpdateUserRequestBody, UserBase } from '@sqrib/shared';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { Button } from '../../../../components/Button/Button.component';
import { Spacer, SpacerSize } from '../../../../components';
import { storage } from '../../../../services/firebase.service';
import { extractFilename } from '../../utils/extractFileName.util';
import FileInput from './subComponent/FileInput/FileInput.component';

import './AvatarCrop.style.scss';

interface AvatarCropProps {
  avatarUrl?: string,
  updateUser: UseMutateAsyncFunction<UserBase, unknown, UpdateUserRequestBody, unknown>,
  userColor: string,
}

export async function deleteAvatarFromBucket(fileName: string) {
  await deleteObject(ref(storage, 'avatars/' + fileName));
}

const AvatarCrop: React.FC<AvatarCropProps> = ({ avatarUrl, updateUser, userColor }) => {
  const [newAvatarUrl, setNewAvatarUrl] = React.useState<string | null>(null);
  const [cropper, setCropper] = React.useState<Cropper | null>(null);
  const [preview, setPreview] = React.useState<Cropper | null>(null);

  const getNewAvatarUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    if (preview) {
      const blob = await fetch(preview.getCroppedCanvas().toDataURL('image/png'))
        .then((res) => res.blob())
      if (blob) {
        const fileName = Date.now() + '.png';
        const storageRef = ref(storage, 'avatars/' + fileName);
        const currentFileName = extractFilename(avatarUrl ?? '');
        // TODO Compress images before saving theme
        const stored = await uploadBytes(storageRef, blob);
        if (!stored) {
          toast.error('An error occured while uploading avatar');
        }
        const _avatarUrl = await getDownloadURL(storageRef);
        await updateUser({ avatar: _avatarUrl })
        await deleteAvatarFromBucket(currentFileName ?? '');
      }
    }
  };

  return (<div style={{ padding: '1rem' }} className='avatar-cropper--wrapper'>
    {!newAvatarUrl && <FileInput getNewAvatarUrl={getNewAvatarUrl} userColor={userColor} />}
    {newAvatarUrl && !preview && <Cropper
      src={newAvatarUrl as string}
      style={{ width: 400 }}
      aspectRatio={1}
      minCropBoxHeight={25}
      minCropBoxWidth={25}
      guides={true}
      checkOrientation={true}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />}
    {preview && <img src={preview?.getCroppedCanvas()?.toDataURL()} width={200} height={200} style={{ borderRadius: '5px', border: '3px solid black' }} />}
    <Spacer y size={SpacerSize.MEDIUM} />
    {cropper && !preview && <Button onClick={() => setPreview(cropper)}>Crop</Button>}
    {cropper && preview && <Button withTimeout onClick={getCropData}>Upload</Button>}
    <Spacer y size={SpacerSize.SMALL} />
    {cropper && preview && <Button onClick={() => {
      setPreview(null);
    }} secondary>Back</Button>}
  </div>
  )
}

export { AvatarCrop }

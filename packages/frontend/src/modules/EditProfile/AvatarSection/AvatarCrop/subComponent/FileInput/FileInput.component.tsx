import React from 'react'
import { Text } from '../../../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../../../components'
import { BiImageAdd } from 'react-icons/bi'

interface FileInputProps {
  getNewAvatarUrl: (e: React.ChangeEvent<HTMLInputElement>) => void
  userColor: string
}

const FileInput = ({ getNewAvatarUrl, userColor }: FileInputProps) => {
  return (
    <>
      <Text p fira centered>Choose an image</Text>
      <Spacer y size={SpacerSize.SMALL} />
      <label className='file-upload'>
        <input
          name='file picker'
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={getNewAvatarUrl}
        />
        <div className='file-upload__icon' style={{ backgroundColor: userColor }}>
          <BiImageAdd size={32} color='white' />
        </div>
        <Spacer y size={SpacerSize.MEDIUM} />
        <Text fira bold>Upload avatar</Text>
      </label>
      <Spacer y size={SpacerSize.SMALL} />
      <Text fira thin centered size={10}>.jpg, .jpeg and .png file</Text>
    </>
  )
}

export default FileInput
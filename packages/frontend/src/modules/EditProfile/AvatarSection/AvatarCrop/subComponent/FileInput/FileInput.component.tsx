import React from 'react'
import { COLORS } from '../../../../../../theme/colors'
import { Text } from '../../../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../../../components'

interface FileInputProps {
  getNewAvatarUrl: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput = ({ getNewAvatarUrl }: FileInputProps) => {
  return (
    <>
      <label className='file-upload' style={{ background: COLORS.GOLD }}>
        <input
          name='file picker'
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={getNewAvatarUrl}
        />
        <Text fira bold>Choose file</Text>
      </label>
      <Spacer y size={SpacerSize.SMALL} />
      <Text fira thin centered>Accept .jpg, .jpeg and .png file</Text>
    </>
  )
}

export default FileInput
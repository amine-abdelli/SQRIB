import React from 'react'
import { SketchPicker } from 'react-color';
import { Button } from '../../../../components/Button/Button.component';
import { Spacer, SpacerSize } from '../../../../components';
import Avatar from '../../../../components/Avatar/Avatar.component';
import { UseMutateAsyncFunction } from 'react-query';
import { UpdateUserRequestBody, UserBase } from '@sqrib/shared';

interface AvatarColorPickerProps {
  color: string,
  username: string,
  onColorSave: UseMutateAsyncFunction<UserBase, unknown, UpdateUserRequestBody, unknown>,
}

const AvatarColorPicker = ({ username, color, onColorSave }: AvatarColorPickerProps) => {
  const [currentColor, setCurrentColor] = React.useState<string>(color)
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row' }}>
      <SketchPicker
        color={currentColor}
        onChange={color => setCurrentColor(color.hex)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 2rem 0.5rem 2rem', width: '15rem' }}>
        <Avatar size='xxxlarge' color={currentColor} username={username} />
        <Spacer y size={SpacerSize.MEDIUM} />
        <Button onClick={async () => await onColorSave({
          color: currentColor,
        })}>Save</Button>
      </div>
    </div>
  )
}

export { AvatarColorPicker }
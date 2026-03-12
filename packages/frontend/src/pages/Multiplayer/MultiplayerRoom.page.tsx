import React from 'react';
import { MultiplayerLayout } from '../../layouts/desktop/MultiplayerLayout.desktop';
import { ClassicEngine } from '../../modules/Multiplayer/Modes/Classic/ClassicEngine/ClassicEngine';
import { ClassicMode } from '../../modules/Multiplayer/Modes/Classic/ClassicMode/ClassicMode.component';
import { ClassicEngineProps } from '../../modules/Multiplayer/Modes/Classic/ClassicEngine/ClassicEngine.props';
import { ClipBoard } from '../../modules/Multiplayer/components';
import { MAIN_ROUTES } from '../../routes/paths';
import { generatePath, useParams } from 'react-router-dom';

const MultiplayerRoom = () => {
  const { roomId } = useParams<{ roomId: string }>()

  const renderClassicMode = React.useCallback(() => {
    return (
      <ClassicEngine>
        <ClassicMode {...{} as ClassicEngineProps} />
      </ClassicEngine>
    )
  }, [roomId])

  return (
    <MultiplayerLayout column>
      {renderClassicMode()}
      {roomId && <ClipBoard url={`${import.meta.env.VITE_FRONTEND_URL}${generatePath(MAIN_ROUTES.MULTIPLAYER_ROOM, { roomId })} `} />}
    </MultiplayerLayout>
  )
}

export default MultiplayerRoom
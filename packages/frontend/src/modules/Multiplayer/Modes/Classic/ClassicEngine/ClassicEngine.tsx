/* eslint-disable max-len */
import React, { useState } from 'react';
import { GetSessionInfo, Languages, Player, PlayerOrSessionStatus, Session, SessionMode, SocketCommonEventsEnum, SocketInGameEventsEnum, SocketPreGameEventsEnum, TLanguages } from '@sqrib/shared';
import { FontSize } from '../../../../../utils';
import { useTimestamp } from '../../../../../hooks';
import { useGetTrainingWordChain } from '../../../../../api/queries';
import { ClassicEngineChildren } from './ClassicEngine.props';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../../../../../contexts/SocketContext';
import { usePlayer } from '../../../../../contexts/PlayerContext';
import { MAIN_ROUTES } from '../../../../../routes/paths';
import toast from 'react-hot-toast';

// World's wpm record held by Sean Wrona since 2010
const WORLD_WPM_RECORD = 256;

function ClassicEngine({ children }: ClassicEngineChildren) {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [indexOfProgression, setIndexOfProgression] = React.useState<number>(0);
  const [wordChain, setWordChain] = React.useState<string[]>(['salut', 'ca', 'va']);
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.MEDIUM);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isUserAllowToType, setIsUserAllowToType] = useState<boolean>(true);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState(useTimestamp(isRunning));
  const [verticalOffSet, setVerticalOffSet] = useState(0);
  const [shouldOpenVictoryModal, setShouldOpenVictoryModal] = React.useState(false)
  const [misspellings, setMisspellings] = React.useState<string[]>([]);
  const [countDown, setCountDown] = useState(60);
  const [wordCount, setWordCount] = useState(75);
  const [language, setLanguage] = React.useState<TLanguages>(Languages.FR);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>();
  const [timer, setTimer] = React.useState<number>(0);

  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { emit, listen, socket } = useSocket();
  const { username, color, avatar } = usePlayer();

  listen(SocketCommonEventsEnum.LAUNCH_TIMER, (timer) => {
    setTimer(timer)
  })

  // Starting for the first time ?
  // 3, 2, 1, GO !
  // emit(SocketCommonEventsEnum.LAUNCH_TIMER, roomId)
  // New game ?

  const sessionOptions = sessionProperties?.options;

  const isTimeTrial = sessionOptions?.mode === SessionMode.TIME_TRIAL
  const { data } = useGetTrainingWordChain({ count: isTimeTrial ? ((WORLD_WPM_RECORD * 1.1) / 60) * countDown : wordCount, language });

  React.useEffect(() => {
    if (!roomId) {
      navigate(MAIN_ROUTES.MULTIPLAYER)
    };
    if (!username) {
      return navigate(`${MAIN_ROUTES.MULTIPLAYER}?redirectTo=${location.pathname}`)
    }
    // Is user already in game ?
    // Check if socket.id is already in the room if not, do a JOIN_ROOM.
    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId)
    emit(SocketPreGameEventsEnum.GET_SESSION_INFO, roomId)
    emit(SocketPreGameEventsEnum.GET_PLAYERS, roomId)
    emit(SocketInGameEventsEnum.SESSION_PROGRESSION, roomId)
  }, [])

  listen(SocketPreGameEventsEnum.GET_SESSION_INFO, ({ options, status, players }: Session) => {
    // If player not in room yet, join it
    const sockerId = socket?.id
    const player = Object.values(players ?? {})?.find(player => player.id === sockerId)
    if (!player) emit(SocketPreGameEventsEnum.JOIN_SESSION, roomId, { username, color, avatar })

    if (roomId && status === PlayerOrSessionStatus.STAGING) {
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId }))
    }
    setSessionProperties({ options, status })
    setWordChain(data?.data ?? [])
  })

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, ({ isValid }) => {
    if (!isValid) {
      toast.error('This session does not exist')
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)
    }
  })

  listen(SocketInGameEventsEnum.SESSION_PROGRESSION, ({ sessions, wordSet }: { sessions: Session, wordSet: string[] }) => {
    const players = Object.values(sessions?.players ?? {});
    setPlayers(players)
    setWordChain(wordSet)
  })

  return (
    <>
      {React.Children.map(children, (child) => React.cloneElement(child, {
        input,
        setInput,
        wordChain,
        typedWords,
        setTypedWords,
        indexOfProgression,
        setIndexOfProgression,
        isRunning,
        setIsRunning,
        fontSize,
        setFontSize,
        isUserAllowToType,
        verticalOffSet,
        setVerticalOffSet,
        shouldOpenVictoryModal,
        setShouldOpenVictoryModal,
        setIsUserAllowToType,
        misspellings,
        setMisspellings,
        players,
        sessionProperties
      })
      )}
    </>
  );
}

export { ClassicEngine };

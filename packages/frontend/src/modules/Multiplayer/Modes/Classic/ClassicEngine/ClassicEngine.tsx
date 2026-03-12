/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  GetSessionInfo, Languages, Player, PlayerOrSessionStatus, Session,
  SocketCommonEventsEnum, SocketInGameEventsEnum, SocketPreGameEventsEnum, TLanguages,
} from '@sqrib/shared';
import { FontSize } from '../../../../../utils';
import { ClassicEngineChildren } from './ClassicEngine.props';
import { useSocket } from '../../../../../contexts/SocketContext';
import { usePlayer } from '../../../../../contexts/PlayerContext';
import { MAIN_ROUTES } from '../../../../../routes/paths';

function ClassicEngine({ children }: ClassicEngineChildren) {
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [indexOfProgression, setIndexOfProgression] = React.useState<number>(0);
  const [wordChain, setWordChain] = React.useState<string[]>([]);
  const [fontSize, setFontSize] = React.useState<FontSize>(FontSize.MEDIUM);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isUserAllowToType, setIsUserAllowToType] = useState<boolean>(false);
  const [verticalOffSet, setVerticalOffSet] = useState(0);
  const [shouldOpenVictoryModal, setShouldOpenVictoryModal] = React.useState(false);
  const [misspellings, setMisspellings] = React.useState<string[]>([]);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [sessionProperties, setSessionProperties] = React.useState<GetSessionInfo>();
  const [timer, setTimer] = React.useState<number>(0);
  const [countdown, setCountdown] = React.useState<number | null>(null);
  const [totalWords, setTotalWords] = React.useState<number>(0);
  const [gameEnded, setGameEnded] = React.useState(false);
  const [rankings, setRankings] = React.useState<Player[]>([]);

  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { emit, listen, socket } = useSocket();
  const { username, color, avatar } = usePlayer();

  // ── Socket listeners ──────────────────────────────────────────────────────

  listen(SocketCommonEventsEnum.LAUNCH_TIMER, useCallback((t: number) => {
    setTimer(t);
  }, []));

  listen(SocketInGameEventsEnum.GAME_COUNTDOWN, useCallback(({ count }: { count: number }) => {
    setCountdown(count);
    if (count <= 0) {
      setTimeout(() => {
        setCountdown(null);
        setIsRunning(true);
        setIsUserAllowToType(true);
      }, 800);
    }
  }, []));

  listen(SocketInGameEventsEnum.GAME_ENDED, useCallback(({ players: ranked, totalWords: tw }: { players: Player[], totalWords: number }) => {
    setGameEnded(true);
    setIsRunning(false);
    setIsUserAllowToType(false);
    setRankings(ranked);
    if (tw) setTotalWords(tw);
    setInput('');
  }, []));

  listen(SocketInGameEventsEnum.SESSION_PROGRESSION, useCallback(({ sessions, wordSet, totalWords: tw }: { sessions: Session, wordSet: string[], totalWords: number }) => {
    const playersList = Object.values(sessions?.players ?? {});
    setPlayers(playersList);
    if (wordSet?.length > 0) setWordChain(wordSet);
    if (tw) setTotalWords(tw);
  }, []));

  listen(SocketPreGameEventsEnum.GET_SESSION_INFO, useCallback(({ options, status, players: sessionPlayers }: Session) => {
    const sockerId = socket?.id;
    const player = Object.values(sessionPlayers ?? {})?.find((p) => p.id === sockerId);
    if (!player) emit(SocketPreGameEventsEnum.JOIN_SESSION, roomId, { username, color, avatar });

    if (roomId && status === PlayerOrSessionStatus.STAGING) {
      navigate(generatePath(MAIN_ROUTES.MULTIPLAYER_STAGING, { roomId }));
    }
    setSessionProperties({ options, status });
  }, [socket?.id, roomId, username, color, avatar]));

  listen(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, useCallback(({ isValid }: { isValid: boolean }) => {
    if (!isValid) {
      toast.error('This session does not exist');
      navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION);
    }
  }, []));

  // ── Initial load ──────────────────────────────────────────────────────────

  React.useEffect(() => {
    if (!roomId) { navigate(MAIN_ROUTES.MULTIPLAYER); return; }
    if (!username) { navigate(`${MAIN_ROUTES.MULTIPLAYER}?redirectTo=${location.pathname}`); return; }

    emit(SocketPreGameEventsEnum.CHECK_SESSION_ID_VALIDITY, roomId);
    emit(SocketPreGameEventsEnum.GET_SESSION_INFO, roomId);
    emit(SocketInGameEventsEnum.SESSION_PROGRESSION, roomId);
  }, []);

  // ── Emit progress when player advances ───────────────────────────────────

  React.useEffect(() => {
    if (!isRunning || !roomId || indexOfProgression === 0) return;

    const elapsed = timer > 0 ? timer : 1;
    const mpm = Math.round((indexOfProgression / elapsed) * 60);
    const precision = indexOfProgression > 0
      ? Math.round(((indexOfProgression - misspellings.length) / indexOfProgression) * 100)
      : 100;

    emit(SocketInGameEventsEnum.UPDATE_PLAYER_PROGRESS, roomId, {
      indexOfProgression,
      wrongWords: misspellings.length,
      correctLetters: indexOfProgression,
      totalLetters: indexOfProgression + misspellings.length,
      wrongLetters: misspellings.length,
      precision,
      mpm,
    });
  }, [indexOfProgression]);

  // ── Render ────────────────────────────────────────────────────────────────

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
        setIsUserAllowToType,
        verticalOffSet,
        setVerticalOffSet,
        shouldOpenVictoryModal,
        setShouldOpenVictoryModal,
        misspellings,
        setMisspellings,
        players,
        sessionProperties,
        timer,
        countdown,
        totalWords,
        gameEnded,
        rankings,
        isZenModeOn: true,
      }))}
    </>
  );
}

export { ClassicEngine };

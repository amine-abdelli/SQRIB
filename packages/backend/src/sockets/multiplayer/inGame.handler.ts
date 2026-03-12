import { Socket } from 'socket.io';
import { PlayerOrSessionStatus, PlayerProgressPayload, SessionMode, SocketInGameEventsEnum } from '@sqrib/shared';
import {
  IO, SESSIONS, WORD_SETS,
} from '../socket';
import { clearTimer } from './common.handler';

export function emitSessionProgression(_: Socket, io: IO, roomId: string) {
  const session = SESSIONS[roomId];
  if (!session) return;
  const totalWords = session.totalWords ?? session.options?.wordCount ?? WORD_SETS[roomId]?.length ?? 0;
  io.to(roomId).emit(SocketInGameEventsEnum.SESSION_PROGRESSION, {
    sessions: session,
    wordSet: WORD_SETS[roomId],
    totalWords,
  });
}

function endGame(socket: Socket, io: IO, roomId: string) {
  const session = SESSIONS[roomId];
  if (!session || session.status === PlayerOrSessionStatus.FINISHED) return;

  session.status = PlayerOrSessionStatus.FINISHED;
  clearTimer(socket, io, roomId);

  const rankedPlayers = Object.values(session.players ?? {}).sort(
    (a, b) => b.indexOfProgression - a.indexOfProgression || b.mpm - a.mpm,
  );

  const totalWords = session.totalWords ?? session.options?.wordCount ?? WORD_SETS[roomId]?.length ?? 0;

  io.to(roomId).emit(SocketInGameEventsEnum.GAME_ENDED, {
    players: rankedPlayers,
    totalWords,
  });
}

export function checkGameEnd(socket: Socket, io: IO, roomId: string) {
  const session = SESSIONS[roomId];
  if (!session) return;

  const players = Object.values(session.players ?? {});
  if (players.length === 0) return;

  const allFinished = players.every((p) => p.status === PlayerOrSessionStatus.FINISHED);
  if (allFinished) {
    endGame(socket, io, roomId);
  }
}

export function updatePlayerProgress(socket: Socket, io: IO, roomId: string, data: PlayerProgressPayload) {
  const session = SESSIONS[roomId];
  if (!session?.players?.[socket.id]) return;

  const player = session.players[socket.id];
  player.indexOfProgression = data.indexOfProgression;
  player.wrongWords = data.wrongWords;
  player.correctLetters = data.correctLetters;
  player.totalLetters = data.totalLetters;
  player.wrongLetters = data.wrongLetters;
  player.precision = data.precision;
  player.mpm = data.mpm;

  // Speed Challenge: player finishes when they reach the word count
  if (session.options?.mode === SessionMode.SPEED_CHALLENGE) {
    const totalWords = session.totalWords ?? session.options?.wordCount ?? 0;
    if (totalWords > 0 && data.indexOfProgression >= totalWords) {
      player.status = PlayerOrSessionStatus.FINISHED;
    }
  }

  emitSessionProgression(socket, io, roomId);
  checkGameEnd(socket, io, roomId);
}

export { endGame };

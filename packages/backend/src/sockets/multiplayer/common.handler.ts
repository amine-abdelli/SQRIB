import { Socket } from 'socket.io';
import { PlayerOrSessionStatus, SessionMode, SocketCommonEventsEnum, SocketInGameEventsEnum } from '@sqrib/shared';
import { IO, SESSIONS, TIMERS, WORD_SETS } from '../socket';

/**
 * Stop the timer and delete it from the global TIMERS object
 */
export function clearTimer(_: Socket, io: IO, roomID: string) {
  if (TIMERS?.[roomID]?.interval) {
    clearInterval(TIMERS[roomID].interval);
  }
  delete TIMERS[roomID];
}

/**
 * Init and start the timer. For Time Trial mode, ends the game when time limit is reached.
 */
export function launchTimer(_: Socket, io: IO, roomID: string) {
  clearTimer(_, io, roomID);
  TIMERS[roomID] = { time: 0, interval: undefined as any };

  const session = SESSIONS[roomID];
  const isTimeTrial = session?.options?.mode === SessionMode.TIME_TRIAL;
  const timeLimit = session?.options?.time;

  TIMERS[roomID].interval = setInterval(() => {
    if (!TIMERS[roomID]) return;

    io.to(roomID).emit(SocketCommonEventsEnum.LAUNCH_TIMER, TIMERS[roomID].time);
    TIMERS[roomID].time += 1;

    // Time Trial: end game when the timer reaches the configured time
    if (isTimeTrial && timeLimit && TIMERS[roomID].time > timeLimit) {
      clearTimer(_, io, roomID);
      const currentSession = SESSIONS[roomID];
      if (currentSession && currentSession.status !== PlayerOrSessionStatus.FINISHED) {
        currentSession.status = PlayerOrSessionStatus.FINISHED;
        Object.values(currentSession.players ?? {}).forEach((p) => {
          if (p.status === PlayerOrSessionStatus.PLAYING) {
            p.status = PlayerOrSessionStatus.FINISHED;
          }
        });
        const rankedPlayers = Object.values(currentSession.players ?? {}).sort(
          (a, b) => b.indexOfProgression - a.indexOfProgression || b.mpm - a.mpm,
        );
        const totalWords = currentSession.totalWords ?? currentSession.options?.wordCount ?? WORD_SETS[roomID]?.length ?? 0;
        io.to(roomID).emit(SocketInGameEventsEnum.GAME_ENDED, {
          players: rankedPlayers,
          totalWords,
        });
      }
    }
  }, 1000);
}

/**
 * Emit a 3-2-1-GO countdown then launch the timer
 */
export function startGameCountdown(_: Socket, io: IO, roomID: string) {
  const session = SESSIONS[roomID];
  if (!session) return;

  Object.values(session.players ?? {}).forEach((p) => {
    p.status = PlayerOrSessionStatus.PLAYING;
  });

  let count = 3;
  io.to(roomID).emit(SocketInGameEventsEnum.GAME_COUNTDOWN, { count });

  const countdownInterval = setInterval(() => {
    count -= 1;
    io.to(roomID).emit(SocketInGameEventsEnum.GAME_COUNTDOWN, { count });

    if (count <= 0) {
      clearInterval(countdownInterval);
      // Small delay so clients see "GO!" before typing starts
      setTimeout(() => launchTimer(_, io, roomID), 800);
    }
  }, 1000);
}

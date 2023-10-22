import { Session } from '@sqrib/shared';

export function toRoomList(sessions: Record<string, Session>) {
  return Object.values(sessions).map(({
    id, options, players,
  }: Session) => ({
    id,
    name: options?.name,
    players: Object.keys(players ?? {})?.length ?? 0,
    language: options?.language,
    mode: options?.mode,
    wordCount: options?.wordCount,
  }));
}

export const basePlayer = {
  wordIndex: 0,
  wrongWords: 0,
  correctLetters: 0,
  totalLetters: 0,
  wrongLetters: 0,
  precision: 0,
  points: 0,
  mpm: 0,
};

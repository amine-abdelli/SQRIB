import {
  Game, log,
} from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { createOnePlayer } from '../../repositories/game/createOnePlayer.repository';
import { createOneScore } from '../../repositories';
import { createOneGame } from '../../repositories/game/createOneGame.repository';
import { Context } from '../../utils';

interface IGameProp {
  id: string;
  language: string;
  name: string;
  setID: string;
  wordAmount: number;
}

interface IClientProp {
  id: string;
  host: boolean;
  correctLetters: number;
  mpm: number;
  points: number;
  precision: number;
  totalLetters: number;
  username: string;
  wordAmount: number;
  wordIndex: number;
  wrongLetters: number;
  wrongWords: number;
}

export async function addGameDetailsService(
  { game, clients }: { clients: IClientProp[], game: IGameProp },
  context: Context,
) {
  try {
  // Create Game
    const gamePayload = await createOneGame({
      host: Object.values(clients).find(({ host }) => host)?.username,
      name: game.name,
      winner: 'fdfdsdf',
      language: game.language,
      word_amount: game.wordAmount,
      player_length: clients.length,
    }, context.prisma);

    if (!gamePayload) {
      log.error('Game could not be created');
      throw new ApolloError('Game could not be created');
    }

    await Promise.all(clients.map(async (aClient) => {
    // Create score
      const score = await createOneScore({
        type: Game.MULTI,
        mpm: aClient?.mpm,
        wrong_words: aClient?.wrongWords,
        correct_letters: aClient?.correctLetters,
        total_letters: aClient?.totalLetters,
        wrong_letters: aClient?.wrongLetters,
        precision: aClient?.precision,
        points: aClient?.points,
        userId: context.userId,
        gameId: gamePayload.id,
      }, context);

      if (!score) {
        log.error('Score could not be created');
        throw new ApolloError('Score could not be created');
      }
      // Create player
      const player = await createOnePlayer({
        user_id: context.userId || null,
        name: aClient?.username,
        game_id: gamePayload.id,
        score_id: score.id,
      }, context.prisma);

      if (!player) {
        log.error('Player could not be created');
        throw new ApolloError('Player could not be created');
      }
    }));
    return { message: 'Game created successfully' };
  } catch (error) {
    log.error('Error while creating game', { error });
    throw new ApolloError('Error while creating game');
  }
}

import {
  createPodium,
  Game, GameType, log,
} from '@aqac/utils';
import { ApolloError } from 'apollo-server-errors';
import { createOnePlayer } from '../../repositories/game/createOnePlayer.repository';
import { createOneScore } from '../../repositories';
import { createOneGame } from '../../repositories/game/createOneGame.repository';

export async function addGameDetailsService(
  { game }: { game: GameType },
) {
  try {
    const { username } = createPodium(game).podium[0];
    const timer = game.timer || 0;
    // Create Game
    const gamePayload = await createOneGame({
      host: Object.values(game.clients).find(({ host }) => host)?.username,
      name: game.name,
      winner: username,
      language: game.language,
      word_amount: game.wordAmount,
      player_length: Object.keys(game.clients).length,
      timer,
    });

    if (!gamePayload) {
      log.error('Game could not be created');
      throw new Error('Game could not be created');
    }
    await Promise.all(Object.values(game.clients)
    // Exclude players that are in staging room and that cannot play
      .filter((aClient) => aClient.status !== 'staging')
      .map(async (aClient) => {
        // Create score
        const score = await createOneScore({
          type: Game.MULTI,
          // Normalize score to 1 minute as we're talking about word per minut (mpm/wpm)
          mpm: Math.round(((aClient?.mpm || 0) / timer) * 60),
          wrong_words: aClient?.wrongWords,
          correct_letters: aClient?.correctLetters,
          total_letters: aClient?.totalLetters,
          wrong_letters: aClient?.wrongLetters,
          precision: aClient?.precision,
          points: aClient?.points,
          userId: aClient?.userId,
          gameId: gamePayload.id,
          username: aClient?.username,
          language: game?.language,
          timer: timer || 0,
        });

        if (!score) {
          log.error('Score could not be created');
          throw new Error('Score could not be created');
        }
        // Create player
        const player = await createOnePlayer({
          user_id: aClient?.userId,
          name: aClient?.username,
          game_id: gamePayload.id,
          score_id: score.id,
        });
        if (!player) {
          log.error('Player could not be created');
          throw new Error('Player could not be created');
        }
      }));
    return { message: 'Game created successfully' };
  } catch (error) {
    log.error('Error while creating game', { error });
    throw new ApolloError('Error while creating game');
  }
}

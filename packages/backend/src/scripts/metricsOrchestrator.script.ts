/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
import { GlobalMetrics, Palmares, Score } from '@prisma/client';
import { log, roundToDecimal, uniqueDays } from '@sqrib/shared';
import { calculateDuration } from '../utils';
import { prisma } from '../client';

// This script is used to recalculate all the metrics based on user's data
export async function refreshUserMetrics() {
  log.info('Refreshing user metrics... 🚀');
  const users = await prisma.user.findMany({
    include: {
      Scores: true,
    },
  });

  for (const aUser of users) {
    log.info(`Processing user ${aUser.username}... 🙋`);
    const userScores = aUser.Scores ?? [];

    const newPalmares: Partial<Palmares> = {
      session_count: userScores.length,
      best_wpm: userScores?.reduce((max: number, score: Score) => Math.max(max, score.wpm), 0),
      average_wpm: Math.round((userScores?.reduce((acc: number, score: Score) => acc + score.wpm, 0) || 0) / userScores.length) || 0,
      average_accuracy: roundToDecimal((userScores?.reduce((acc: number, score: Score) => acc + score.accuracy, 0) || 0) / userScores.length) || 0,
      best_points: userScores?.reduce((max: number, score: Score) => Math.max(max, score.points), 0),
      total_points: userScores?.reduce((acc: number, score: Score) => acc + score.points, 0),
      total_xp: 0,
      total_time_in_seconds: userScores?.reduce((acc: number, score: Score) => acc + calculateDuration(Number(score.start_time), Number(score.end_time)), 0),
      total_words_typed: userScores?.reduce((acc: number, score: Score) => acc + score.typed_words, 0),
      days_of_activity: uniqueDays(userScores.map((score) => String(score.created_at))).length,
    };

    log.info(`Updating palmares for user ${aUser.username}... 🙋`);

    const userPalmares = await prisma.palmares.update({
      where: {
        user_id: aUser.id,
      },
      data: newPalmares,
    });

    if (!userPalmares) {
      throw new Error(`No palmares found for user ${aUser.username}`);
    }

    log.info(`User palmares updated successfully for user ${aUser.username}... 😄🍾`);
  }
}

export async function refreshGlobalMetrics() {
  log.info('Refreshing global metrics... 🚀');
  const allPalmares = await prisma.palmares.findMany();
  const newGlobalMetrics: Partial<GlobalMetrics> = {
    account_count: allPalmares.length,
    average_accuracy: roundToDecimal(allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.average_accuracy, 0) / allPalmares.length),
    average_wpm: Math.round(allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.average_wpm, 0) / allPalmares.length),
    best_points: allPalmares.reduce((acc: number, palmares: Palmares) => Math.max(acc, palmares.best_points), 0),
    best_wpm: allPalmares.reduce((acc: number, palmares: Palmares) => Math.max(acc, palmares.best_wpm), 0),
    average_points: Math.round(allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.total_points, 0) / allPalmares.length),
    best_accuracy: 100,
    game_count: allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.session_count, 0),
    total_time_in_seconds: allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.total_time_in_seconds, 0),
    // total_typed_words: allPalmares.reduce((acc: number, palmares: Palmares) => acc + palmares.total_words_typed, 0),
  };

  const globalMetrics = await prisma.globalMetrics.findFirst();

  if (!globalMetrics) {
    throw new Error('No global metrics found');
  }

  log.info('Updating global metrics... 🚀');

  const updatedGlobalMetrics = await prisma.globalMetrics.update({
    where: {
      id: globalMetrics?.id,
    },
    data: newGlobalMetrics,
  });
  if (!updatedGlobalMetrics) {
    throw new Error('An error occured while updating global metrics');
  }
  log.info('Global metrics updated successfully... 😄🍾');
}

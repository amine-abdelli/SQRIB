import { PrismaClient } from '@prisma/client';

export class Database_manager {
  db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async findManyScores() {
    const users = await this.db.score.findMany();
    return users;
  }

  async findManyGames() {
    return this.db.game.findMany();
  }

  async createOneScore(args: any) {
    return this.db.score.create({
      data: {
        ...args,
      },
    });
  }

  async createOneGame(args: any) {
    return this.db.game.create({
      data: args,
    });
  }

  async createOnePlayer(args: any) {
    return this.db.player.create({
      data: args,
    });
  }
}

import {
  Game, Player, PrismaClient, Score,
} from '@prisma/client';

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

  async createOneScore(args: Score) {
    return this.db.score.create({
      data: {
        ...args,
      },
    });
  }

  async createOneGame(args: Game) {
    return this.db.game.create({
      data: args,
    });
  }

  async createOnePlayer(args: Player) {
    return this.db.player.create({
      data: args,
    });
  }
}

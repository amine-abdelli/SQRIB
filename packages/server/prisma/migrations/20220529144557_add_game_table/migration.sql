/*
  Warnings:

  - You are about to drop the column `game_mode` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `timing` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "game_mode",
DROP COLUMN "timing",
ADD COLUMN     "gameId" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
DROP COLUMN "rank",
DROP COLUMN "xp";

-- DropEnum
DROP TYPE "Rank";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "game_parameters" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievment" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Achievment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_host_key" ON "Game"("host");

-- CreateIndex
CREATE UNIQUE INDEX "Achievment_userId_key" ON "Achievment"("userId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_score_id_fkey" FOREIGN KEY ("score_id") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievment" ADD CONSTRAINT "Achievment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

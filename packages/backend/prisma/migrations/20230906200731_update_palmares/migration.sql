/*
  Warnings:

  - You are about to drop the column `best_accuracy` on the `Palmares` table. All the data in the column will be lost.
  - You are about to drop the column `game_count` on the `Palmares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Palmares" DROP COLUMN "best_accuracy",
DROP COLUMN "game_count",
ADD COLUMN     "average_wpm" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "session_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_words_typed" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT;

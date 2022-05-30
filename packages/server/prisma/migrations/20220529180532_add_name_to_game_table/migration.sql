/*
  Warnings:

  - You are about to drop the column `game_parameters` on the `Game` table. All the data in the column will be lost.
  - Added the required column `language` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_length` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word_amount` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "game_parameters",
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "player_length" INTEGER NOT NULL,
ADD COLUMN     "word_amount" INTEGER NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

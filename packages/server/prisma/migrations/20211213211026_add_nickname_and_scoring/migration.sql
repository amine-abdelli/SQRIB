/*
  Warnings:

  - You are about to drop the column `key_count` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `key_total` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `word_count` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the column `word_total` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correct_letters` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_mode` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mpm` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precision` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_letters` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wrong_letters` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wrong_words` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "key_count",
DROP COLUMN "key_total",
DROP COLUMN "score",
DROP COLUMN "word_count",
DROP COLUMN "word_total",
ADD COLUMN     "correct_letters" INTEGER NOT NULL,
ADD COLUMN     "game_mode" TEXT NOT NULL,
ADD COLUMN     "mpm" INTEGER NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL,
ADD COLUMN     "precision" INTEGER NOT NULL,
ADD COLUMN     "total_letters" INTEGER NOT NULL,
ADD COLUMN     "wrong_letters" INTEGER NOT NULL,
ADD COLUMN     "wrong_words" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

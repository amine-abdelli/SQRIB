/*
  Warnings:

  - You are about to drop the column `wordSet` on the `WordSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WordSet" DROP COLUMN "wordSet",
ADD COLUMN     "word_set" TEXT[];

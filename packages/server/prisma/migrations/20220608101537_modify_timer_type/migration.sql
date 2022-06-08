/*
  Warnings:

  - You are about to drop the column `brotherHoodId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Achievment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrotherHood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievment" DROP CONSTRAINT "Achievment_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_brotherHoodId_fkey";

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "timer" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "brotherHoodId";

-- DropTable
DROP TABLE "Achievment";

-- DropTable
DROP TABLE "BrotherHood";

/*
  Warnings:

  - You are about to drop the column `fontSize` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "fontSize",
ADD COLUMN     "font_size" INTEGER NOT NULL DEFAULT 36;

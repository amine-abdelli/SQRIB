-- AlterTable
ALTER TABLE "User" ADD COLUMN     "didacticiel_level" INTEGER NOT NULL DEFAULT 3;

-- CreateTable
CREATE TABLE "WordSet" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "wordSet" TEXT[],

    CONSTRAINT "WordSet_pkey" PRIMARY KEY ("id")
);

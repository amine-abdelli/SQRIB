-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('EMPEROR', 'SHOGUN', 'DAIMYO', 'SAMURAI', 'RONIN');

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "word_total" INTEGER NOT NULL,
    "key_total" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "key_count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT,
    "lastPasswordReset" TIMESTAMP(3),
    "last_activity" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "rank" "Rank" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "brotherHoodId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrotherHood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BrotherHood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_brotherHoodId_fkey" FOREIGN KEY ("brotherHoodId") REFERENCES "BrotherHood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

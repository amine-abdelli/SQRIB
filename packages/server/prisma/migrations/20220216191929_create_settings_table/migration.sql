-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT E'fr',
    "fontSize" INTEGER NOT NULL DEFAULT 36,
    "theme" TEXT NOT NULL DEFAULT E'light',
    "sound" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

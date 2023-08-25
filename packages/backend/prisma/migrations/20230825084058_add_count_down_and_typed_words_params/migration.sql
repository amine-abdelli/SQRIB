-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "typed_words" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "count_down" INTEGER,
ALTER COLUMN "word_count" DROP NOT NULL;

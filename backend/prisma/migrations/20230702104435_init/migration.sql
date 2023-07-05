-- CreateTable
CREATE TABLE "SleepRecord" (
    "id" SERIAL NOT NULL,
    "bedtime" TIMESTAMP(3) NOT NULL,
    "wakeup" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "SleepRecord_pkey" PRIMARY KEY ("id")
);

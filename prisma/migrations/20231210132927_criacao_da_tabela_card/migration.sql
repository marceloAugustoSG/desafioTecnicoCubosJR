-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

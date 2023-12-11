/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_account_key" ON "Account"("account");

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "peopleId" TEXT;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE SET NULL ON UPDATE CASCADE;

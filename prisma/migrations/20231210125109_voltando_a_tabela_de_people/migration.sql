/*
  Warnings:

  - You are about to drop the `Cartao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cartao" DROP CONSTRAINT "Cartao_contaId_fkey";

-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_pessoaId_fkey";

-- DropTable
DROP TABLE "Cartao";

-- DropTable
DROP TABLE "Conta";

-- DropTable
DROP TABLE "Pessoa";

-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "People_document_key" ON "People"("document");

/*
  Warnings:

  - You are about to drop the `Cartao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cartao" DROP CONSTRAINT "Cartao_contaId_fkey";

-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_pessoaId_fkey";

-- DropForeignKey
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_contaId_fkey";

-- DropTable
DROP TABLE "Cartao";

-- DropTable
DROP TABLE "Conta";

-- DropTable
DROP TABLE "Transacao";

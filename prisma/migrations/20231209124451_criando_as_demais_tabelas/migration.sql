/*
  Warnings:

  - The primary key for the `Conta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Conta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pessoa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `saldo` to the `Conta` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pessoaId` on the `Conta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_pessoaId_fkey";

-- AlterTable
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_pkey",
ADD COLUMN     "saldo" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "pessoaId",
ADD COLUMN     "pessoaId" INTEGER NOT NULL,
ADD CONSTRAINT "Conta_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Cartao" (
    "id" SERIAL NOT NULL,
    "contaId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cartao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "contaId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cartao" ADD CONSTRAINT "Cartao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

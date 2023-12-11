-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "titular" TEXT NOT NULL,
    "numero_conta" INTEGER NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "pessoaId" INTEGER,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

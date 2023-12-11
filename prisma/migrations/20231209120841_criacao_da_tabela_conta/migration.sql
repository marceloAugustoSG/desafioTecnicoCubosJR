-- CreateTable
CREATE TABLE "Conta" (
    "id" TEXT NOT NULL,
    "pessoaId" TEXT NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

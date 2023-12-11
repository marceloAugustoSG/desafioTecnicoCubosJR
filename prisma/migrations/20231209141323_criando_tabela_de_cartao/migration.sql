-- CreateTable
CREATE TABLE "Cartao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "numero_cartao" INTEGER NOT NULL,
    "contaId" INTEGER,

    CONSTRAINT "Cartao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cartao" ADD CONSTRAINT "Cartao_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

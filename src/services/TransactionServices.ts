import { prismaClient } from "../PrismaClient";


export const validTypeTransactionDebit = async (type: string, accountId: string, value: number): Promise<{ insufficientFunds: boolean }> => {
    if (type !== "debit") {
        // Se não for uma transação de débito, não há verificação de saldo.
        return { insufficientFunds: false };
    }

    // Verifique o saldo da conta
    const account = await prismaClient.account.findUnique({
        where: {
            id: accountId
        }
    })

    if (!account) {
        throw new Error("Conta não encontrada.");
    }

    if (account.balance < value) {
        return { insufficientFunds: true };
    }

    return { insufficientFunds: false };
};
import { Prisma } from "@prisma/client";
import { prismaClient } from "../PrismaClient";

class Account {

    async countItems(): Promise<number> {
        const totalCount = await prismaClient.account.count();
        return totalCount;
    }

    async createAccount(idPerson, data) {

        const newAccount = await prismaClient.account.create({
            data: {
                ...data,
                peopleId: idPerson,
                //iniciando conta com 500 reais
                balance: 500
            },
            select: {
                id: true,
                branch: true,
                account: true,
                createAt: true,
                updateAt: true,
                balance: true
            }
        })
        return newAccount
    }

    async listAccounts({ offset, limit, sortBy }): Promise<any[]> {
        const persons = await prismaClient.account.findMany({
            select: {
                id: true,
                balance: true,
                branch: true,
                account: true
            },
            orderBy: { createAt: sortBy.createAt === -1 ? 'desc' : 'asc' }, // Ajustar a estrutura do orderBy
            skip: offset,
            take: limit,
        });
        return persons;
    }

    async listAllCardsAccount(id) {
        const cards = prismaClient.card.findMany({
            where: {
                accountId: id
            }, select: {
                id: true,
                type: true,
                number: true,
                cvv: true,
                createAt: true,
                updateAt: true,
                accountId: false
            }
        })
        return cards
    }

    async createCardAccount(idAccount, data) {
        const newCard = prismaClient.card.create({
            data: {
                ...data,
                accountId: idAccount,
            }, select: {
                id: true,
                type: true,
                number: true,
                cvv: true,
                createAt: true,
                updateAt: true,
                accountId: true
            }
        })
        return newCard
    }


    async createTransactionAccount(idAccount, data) {
        const newTransaction = prismaClient.transaction.create({
            data: {
                ...data,
                accountId: idAccount,
            }, select: {
                id: true,
                value: true,
                type: false,
                description: true,
                createAt: true,
                updateAt: true
            }
        })
        return newTransaction
    }

    async listAllTransactions(id) {
        const transactions = prismaClient.transaction.findMany({
            where: {
                accountId: id
            }, select: {
                id: true,
                value: true,
                description: true,
                createAt: true,
                updateAt: true
            }
        })
        return transactions
    }
    async listAllTransactionsForFilter(id) {
        const transactions = prismaClient.transaction.findMany({
            where: {
                accountId: id
            }, select: {
                id: true,
                value: true,
                description: true,
                createAt: true,
                updateAt: true,
                type: true, accountId: true
            }
        })
        return transactions
    }

    async listAllTransactionsWithFilters(id, filters) {
        const transactions = await prismaClient.transaction.findMany({
            where: {
                accountId: id,
                type: filters.type,
                description: {
                    contains: filters.search,
                },
            },
            select: {
                id: true,
                value: true,
                description: true,
                type: true,
                createAt: true,
                updateAt: true,
            },
        });

        return transactions;
    }

    async getBalenceAccount(id: string) {

        const account = await prismaClient.account.findUnique({
            where: {
                id
            }
        })
        return account.balance
    }
}

export default new Account()
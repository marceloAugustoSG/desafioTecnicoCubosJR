import { prismaClient } from "../PrismaClient";

class Account {

    async createAccount(idPerson, data) {

        const newAccount = await prismaClient.account.create({
            data: {
                ...data,
                peopleId: idPerson,
            },
            select: {
                id: true,
                branch: true,
                account: true,
                createAt: true,
                updateAt: true,
            }
        })
        return newAccount
    }

    async listAccounts() {
        const accounts = await prismaClient.account.findMany({
            select: {
                id: true,
                branch: true,
                account: true,
                createAt: true,
                updateAt: true,
            }
        })

        return accounts
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

    async listAllCards(id) {
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
    async createTransactionAccount(idAccount, data) {
        const newTransaction = prismaClient.transaction.create({
            data: {
                ...data,
                accountId: idAccount,
            }, select: {
                id: true,
                value: true,
                description: true,
                createAt: true,
                updateAt: true
            }
        })
        return newTransaction
    }

    async listAllTransactions(id) {
        const cards = prismaClient.transaction.findMany({
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
        return cards
    }

 
}

export default new Account()
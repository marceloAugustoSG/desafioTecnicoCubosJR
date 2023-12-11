import { prismaClient } from "../PrismaClient";

class People {

    async countItems(): Promise<number> {
        const totalCount = await prismaClient.people.count();
        return totalCount;
    }

    async createPeople(data) {
        const newPeople = await prismaClient.people.create({
            data, select: {
                id: true,
                name: true,
                document: true,
                createAt: true,
                updateAt: true
            }
        })

        return newPeople
    }

    async listPerson({ offset, limit, sortBy }): Promise<any[]> {
        const persons = await prismaClient.people.findMany({
            select: {
                id: true,
                name: true,
                document: true,
                createAt: true,
                updateAt: true,
                accounts: true
            },
            orderBy: { createAt: sortBy.createAt === -1 ? 'desc' : 'asc' }, // Ajustar a estrutura do orderBy
            skip: offset,
            take: limit,
        });
        return persons;
    }

    async listPersonAccounts(idPerson) {
        const accounts = await prismaClient.account.findMany({
            where: {
                peopleId: idPerson
            }
        })
        return accounts
    }

    async listCardsPerson(idPerson) {
        const account = await prismaClient.account.findMany({
            where: {
                peopleId: idPerson
            }, select: {
                cards: {
                    select: {
                        id: true,
                        type: true,
                        number: true,
                        cvv: true,
                        createAt: true,
                        updateAt: true
                    }
                }
            }

        })


        const allCards = account.flatMap((account) => account.cards);

        return allCards;
    }
}
export default new People()
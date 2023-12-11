import { prismaClient } from "../PrismaClient";


class Transaction {

    async countItems(): Promise<number> {
        const totalCount = await prismaClient.transaction.count();
        return totalCount;
    }

    async listTransaction({ offset, limit, sortBy }): Promise<any[]> {
        const cards = await prismaClient.transaction.findMany({
            select: {
                id: true,
                value: true,
                type: true,
                description: true,
                createAt: true,
                updateAt: true
            },
            orderBy: { createAt: sortBy.createAt === -1 ? 'desc' : 'asc' }, // Ajustar a estrutura do orderBy
            skip: offset,
            take: limit,
        });
        return cards;
    }


}
export default new Transaction()
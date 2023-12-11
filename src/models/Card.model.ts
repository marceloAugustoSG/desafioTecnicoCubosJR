import { prismaClient } from "../PrismaClient";

class Card {

    async countItems(): Promise<number> {
        const totalCount = await prismaClient.card.count();
        return totalCount;
    }

    async listCards({ offset, limit, sortBy }): Promise<any[]> {
        const cards = await prismaClient.card.findMany({
            select: {
                id: true,
                number: true,
                cvv: true,
                type: true,
                createAt: true,
                updateAt: true,
            },
            orderBy: { createAt: sortBy.createAt === -1 ? 'desc' : 'asc' }, // Ajustar a estrutura do orderBy
            skip: offset,
            take: limit,
        });
        return cards;
    }



}
export default new Card()
import { prismaClient } from "../PrismaClient";


export const isUniqueAccount = async (account: string): Promise<boolean> => {
    const existingAccount = await prismaClient.account.findUnique({
        where: {
            account: account,
        },
    });

    return !existingAccount;
}

// Função para validar a Agência com exatos 3 dígitos
export const isValidBranch = async (branch: string): Promise<boolean> => {
    // Verifica se a agência possui exatamente 3 dígitos numéricos
    const isValid = /^\d{3}$/
    return !isValid.test(branch)
}



export const formatAccount = (account: string): string => {
    const formattedAccount = `${account.slice(0, 7)}-${account.slice(7)}`;
    return formattedAccount;
};

// export const formatAccounts = async (account: string): Promise<string> => {
//     if (account && account.length === 10) {
//         return `${account.slice(0, 7)}-${account.slice(7)}`;
//     } else {
//         return account;
//     }
// }

export const formatLast4Digits = (cardNumber: string): string => {
    return cardNumber.slice(-4)
}

export const validNumberCard = async (cardNumber: string): Promise<boolean> => {
    // Expressão regular para validar o número do cartão no formato "XXXX XXXX XXXX XXXX"
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/;

    // Testa se o número do cartão corresponde ao formato esperado
    return regex.test(cardNumber);
}

export const validTypeCard = async (typeCard: string): Promise<boolean> => {

    //checando o tipo do cartão
    if (typeCard === "physical" || typeCard === "virtual") {
        return true
    } else {
        return false
    }

}
export const isAccountPhysicalCard = async (accountId: string): Promise<boolean> => {
    const cartoesFisicos = await prismaClient.card.findMany({
        where: {
            accountId: accountId,
            type: 'physical',
        },
    });
    console.log("teste:" + cartoesFisicos)
    return cartoesFisicos.length > 0;
};

export const isValidCvv = async (cvv: string): Promise<boolean> => {
    // Verifica se o CVV possui exatamente 3 dígitos
    return /^\d{3}$/.test(cvv);
};






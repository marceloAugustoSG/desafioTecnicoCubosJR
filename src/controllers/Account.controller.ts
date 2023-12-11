import AccountModel from "../models/Account.model";
import { Request, Response } from "express";
import { isUniqueAccount, isValidBranch, formatAccount, formatLast4Digits, validNumberCard, validTypeCard, isAccountPhysicalCard, isValidCvv } from "../services/AccountServices";
import { validTypeTransactionDebit } from "../services/TransactionServices";
export const create = async (req: Request, res: Response) => {
    const peopleId = req.params.id;
    const account = req.body.account;
    const branch = req.body.branch;

    console.log("account:" + account);
    console.log("branch:" + branch);

    try {
        // Verifica se a conta já existe
        const isExistAccount = await isUniqueAccount(account);
        if (!isExistAccount) {
            res.status(400).json({ message: "Esse número de conta já consta em nossa base de dados." });
            return;
        }

        // Verifica se a agência é válida(3 dígitos)
        const isBranchValid = await isValidBranch(branch);
        if (isBranchValid) {
            res.status(400).json({ message: "O número de agência deve possuir exatos 3 dígitos." });
            return;
        }
        // Cria a conta
        const newAccount = await AccountModel.createAccount(peopleId, req.body);
        //Formata o numero da conta
        const formattedAccount = await formatAccount(newAccount.account);
        newAccount.account = formattedAccount
        res.status(200).json(newAccount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro durante a criação da conta." });
    }
}

export const createCardAccount = async (req: Request, res: Response) => {
    const accountId = req.params.id
    const { type, number, cvv } = req.body
    try {

        //validações :
        // Tipo do cartão: Um cartão pode ser do tipo physical ou virtual.
        const validTyCard = await validTypeCard(type)
        // Uma conta pode ter vários cartões, porém é permitido somente um cartão físico por conta. Virtuais são ilimitados.
        const isCardPhysical = await isAccountPhysicalCard(accountId);
        // No campo number, o número completo do cartão deve ser informado na criação.
        const validNunCard = await validNumberCard(number)
        // O cvv deve conter exatos 3 dígitos.

        const cvv3Digits = await isValidCvv(cvv)
        // No campo number, somente os 4 últimos números do cartão devem ser retornados na resposta.

        //No campo number, o número completo do cartão deve ser informado na criação.
        if (!validNunCard) {
            res.status(400).json({ message: "Número de cartão não aceito" })
            return;
        }
        if (!validTyCard) {
            res.status(400).json({ message: "Tipo de cartão não aceito" })
            return;
        }


        if (type === "physical" && isCardPhysical) {
            console.log(isCardPhysical)
            res.status(400).json({ message: "A conta ja possui um cartão fisico" })
            return;
        }

        if (!cvv3Digits) {
            res.status(400).json({ message: "Cvv tem que ter 3 numeros" })
            return;
        }

        //mostrando os ultimos 4 digitos

        const newCard = await AccountModel.createCardAccount(accountId, req.body)

        const format4Digit = formatLast4Digits(newCard.number)
        newCard.number = format4Digit
        console.log(newCard)
        res.status(200).json(newCard)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const listAccountCards = async (req: Request, res: Response) => {
    const accountId = req.params.id;
    try {
        const cards = await AccountModel.listAllCardsAccount(accountId);

        // Formatando o atributo number de card para exibir os últimos 4 dígitos
        const formattedCards = cards.map(card => ({

            id: card.id,
            type: card.type,
            number: formatLast4Digits(card.number),
            cvv: card.cvv,
            createAt: card.createAt,
            updateAt: card.updateAt,

        }));

        console.log(formattedCards);

        if (formattedCards.length === 0) {
            res.status(200).json({ message: "Essa conta não possui nenhum cartão" });
        } else {
            res.status(200).json({ cards: formattedCards });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

export const createTransactionAccount = async (req: Request, res: Response) => {

    // ao criar a tabela de transações no bd , eu tive que adicionar uma coluna type,pois no requisito
    // estava dizendo que uma transação pode ser de debito ou crédito,mais no exemplo do requisito nao tinha

    const accountId = req.params.id
    const { type, value } = req.body
    try {
        if (type === "debit") {
            // Se for uma transação de débito, validar o saldo
            const balanceCheck = await validTypeTransactionDebit(type, accountId, value);

            if (balanceCheck.insufficientFunds) {
                return res.status(400).json({ message: "Saldo insuficiente para a transação de débito." });
            }
        }

        // Cria a transação
        const newTransaction = await AccountModel.createTransactionAccount(accountId, req.body);

        res.status(200).json(newTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro durante a criação da transação.", error: error.message });
    }
}

export const listTransactions = async (req: Request, res: Response) => {
    const accountId = req.params.id

    try {
        const transactions = await AccountModel.listAllTransactions(accountId)
        if (transactions.length === 0) {
            res.status(200).json({ message: "Essa conta não possui nenhuma transação" })
        } else {
            res.status(200).json({ transactions })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const listTransactionsWithFilters = async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const filters = {
        type: req.query.type as string | undefined,
        search: req.query.search as string | undefined,
    };

    try {
        const transactions = await AccountModel.listAllTransactionsWithFilters(accountId, filters);
        if (transactions.length === 0) {
            res.status(200).json({ message: "Nenhum resultado encontrado" });
            return;
        }

        res.status(200).json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao obter as transações." });
    }
};
export const getBalance = async (req: Request, res: Response) => {

    try {
        const balance = await AccountModel.getBalenceAccount(req.params.accountId)
        res.status(200).json({ balance: balance })

    } catch (error) {
        res.status(200).json(error)
    }

}



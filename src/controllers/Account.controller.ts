import AccountModel from "../models/Account.model";
import { Request, Response } from "express";
import { isUniqueAccount, isValidBranch, formatAccount, formatLast4Digits, validNumberCard } from "../services/AccountServices";

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

export const list = async (req: Request, res: Response) => {
    try {
        const accounts = await AccountModel.listAccounts();

        //formatando o atributo account de account para receber a mascara
        const formattedAccounts = accounts.map(account => ({
            id: account.id,
            branch: account.branch,
            account: formatAccount(account.account),
            createAt: account.createAt,
            updateAt: account.updateAt,
        }));

        res.status(200).json(formattedAccounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao obter as contas." });
    }
};

export const createCardAccount = async (req: Request, res: Response) => {
    const accountId = req.params.id
    try {
        const newCard = await AccountModel.createCardAccount(accountId, req.body)

        const validNunCard = await validNumberCard(newCard.number)
        //No campo number, o número completo do cartão deve ser informado na criação.
        if (!validNunCard) {
            res.status(400).json({ message: "Número de cartão não aceito" })
            return;
        }
        //mostrando os ultimos 4 digitos
        const format4Digit = await formatLast4Digits(newCard.number)
        newCard.number = format4Digit
        console.log(newCard)
        res.status(200).json(newCard)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const listCards = async (req: Request, res: Response) => {
    const accountId = req.params.id
    try {
        const cards = await AccountModel.listAllCards(accountId)
        console.log(cards)
        if (cards.length === 0) {
            res.status(200).json({ message: "Essa conta não possui nenhum cartão" })
        } else {
            res.status(200).json({ cards })
        }
    } catch (error) {
        res.status(400).json(error)

    }
}

export const createTransactionAccount = async (req: Request, res: Response) => {
    const accountId = req.params.id
    console.log(accountId)
    try {


        const newTransaction = await AccountModel.createTransactionAccount(accountId, req.body)
        res.status(200).json(newTransaction)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
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
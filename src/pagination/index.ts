import AccountModel from "../models/Account.model";
import PeopleModel from "../models/People.model";
import CardModel from "../models/Card.model";
import TransactionModel from "../models/Transaction.model";
import { formatAccount } from "../services/AccountServices";
import { formatLast4Digits } from "../services/AccountServices";
import { Request, Response } from "express";

export const listPeoplesPagination = async (req: Request, res: Response) => {

    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const currentPage = Number(req.query.currentPage) || 1;

    try {
        // Paginação
        const offset = (currentPage - 1) * itemsPerPage;

        // Ordenação decrescente por data de criação
        const sortBy = { createAt: -1 };

        // Consulta para obter pessoas paginadas e ordenadas
        const peoples = await PeopleModel.listPerson({ offset, limit: itemsPerPage, sortBy });

        // Contagem total de itens
        const totalPeoples = await PeopleModel.countItems();

        // Calcula o total de páginas
        const pageCount = Math.ceil(totalPeoples / itemsPerPage);

        if (peoples.length === 0) {

            res.status(404).json({ message: "Nenhuma pessoa cadastrada no sistema" })
            return;
        }

        // Responde com os resultados e informações de paginação
        res.status(200).json({
            peoples: peoples,
            totalCount: totalPeoples,
            itemsPerPage,
            currentPage,
            pageCount
        });

    } catch (error) {
        console.error("Erro ao listar pessoas:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const listAccountPagination = async (req: Request, res: Response) => {

    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const currentPage = Number(req.query.currentPage) || 1;

    try {
        // Paginação
        const offset = (currentPage - 1) * itemsPerPage;

        // Ordenação decrescente por data de criação
        const sortBy = { createAt: -1 };

        // Consulta para obter pessoas paginadas e ordenadas
        const accounts = await AccountModel.listAccounts({ offset, limit: itemsPerPage, sortBy });

        // Contagem total de itens
        const totalAccounts = await AccountModel.countItems();

        // Calcula o total de páginas
        const pageCount = Math.ceil(totalAccounts / itemsPerPage);

        if (accounts.length === 0) {

            res.status(404).json({ message: "Nenhuma conta no sistema" })
            return;
        }


        const formattedAccounts = accounts.map(account => ({
            id: account.id,
            branch: account.branch,
            account: formatAccount(account.account),
            createAt: account.createAt,
            updateAt: account.updateAt,
        }));


        // Responde com os resultados e informações de paginação
        res.status(200).json({
            account: formattedAccounts,
            totalCount: totalAccounts,
            itemsPerPage,
            currentPage,
            pageCount,
        });

    } catch (error) {
        console.error("Erro ao listar os contas:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const listCardPagination = async (req: Request, res: Response) => {

    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const currentPage = Number(req.query.currentPage) || 1;

    console.log({ itemsPerPage, currentPage })

    try {
        // Paginação
        const offset = (currentPage - 1) * itemsPerPage;

        // Ordenação decrescente por data de criação
        const sortBy = { createAt: -1 };

        // Consulta para obter pessoas paginadas e ordenadas
        const cards = await CardModel.listCards({ offset, limit: itemsPerPage, sortBy });

        // Contagem total de itens
        const totalCards = await CardModel.countItems();

        // Calcula o total de páginas
        const pageCount = Math.ceil(totalCards / itemsPerPage);


        if (cards.length === 0) {

            res.status(404).json({ message: "Nenhum cartão" })
            return;
        }

        const formattedCards = cards.map(card => ({

            id: card.id,
            type: card.type,
            number: formatLast4Digits(card.number),
            cvv: card.cvv,
            createAt: card.createAt,
            updateAt: card.updateAt,

        }));


        // Responde com os resultados e informações de paginação
        res.status(200).json({
            cards: formattedCards,
            totalCount: totalCards,
            itemsPerPage,
            currentPage,
            pageCount
        });

    } catch (error) {
        console.error("Erro ao listar cartões:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const listTransactionPagination = async (req: Request, res: Response) => {

    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const currentPage = Number(req.query.currentPage) || 1;


    try {
        // Paginação
        const offset = (currentPage - 1) * itemsPerPage;

        // Ordenação decrescente por data de criação
        const sortBy = { createAt: -1 };

        // Consulta para obter pessoas paginadas e ordenadas
        const transactions = await TransactionModel.listTransaction({ offset, limit: itemsPerPage, sortBy });

        // Contagem total de itens
        const totalTransactions = await TransactionModel.countItems();

        // Calcula o total de páginas
        const pageCount = Math.ceil(totalTransactions / itemsPerPage);

        // Responde com os resultados e informações de paginação

        if (transactions.length === 0) {

            res.status(404).json({ message: "Nenhuma transação" })
            return;
        }
        res.status(200).json({
            transactions: transactions,
            totalCount: totalTransactions,
            itemsPerPage,
            currentPage,
            pageCount
        });

    } catch (error) {
        console.error("Erro ao listar transações:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
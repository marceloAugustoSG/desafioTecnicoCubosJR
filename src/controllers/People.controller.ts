import PeopleModel from "../models/People.model";
import { Request, Response } from "express";
import { formatLast4Digits } from "../services/AccountServices";



export const create = async (req: Request, res: Response) => {
    try {
        const newPerson = await PeopleModel.createPeople(req.body)
        res.status(200).json(newPerson)
    } catch (error) {
        res.status(400).json(error)

    }
};



export const listAccounts = async (req: Request, res: Response) => {
    const idPerson = req.params.id
    try {
        const accounts = await PeopleModel.listPersonAccounts(idPerson)
        if (accounts.length === 0) {
            res.status(200).json({ message: "Você não possui nenhuma conta" })
        } else {
            res.status(200).json({ accounts })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};

export const listCards = async (req: Request, res: Response) => {
    const idPerson = req.params.id
    try {
        const cards = await PeopleModel.listCardsPerson(idPerson)
        console.log(cards)

        const formattedCards = cards.map(card => ({

            id: card.id,
            type: card.type,
            number: formatLast4Digits(card.number),
            cvv: card.cvv,
            createAt: card.createAt,
            updateAt: card.updateAt,

        }));


        if (cards.length === 0) {
            res.status(200).json({ message: "Você não possui nenhum cartão " })
        } else {
            res.status(200).json({ cards: formattedCards })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};




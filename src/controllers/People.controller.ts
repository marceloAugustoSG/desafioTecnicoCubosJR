import PeopleModel from "../models/People.model";
import { Request, Response } from "express";



export const create = async (req: Request, res: Response) => {
    try {
        const newPerson = await PeopleModel.createPeople(req.body)
        res.status(200).json(newPerson)
    } catch (error) {
        res.status(400).json(error)

    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const persons = await PeopleModel.listPerson()
        res.status(200).json(persons)
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
        if (cards.length === 0) {
            res.status(200).json({ message: "Você não possui nenhum cartão " })
        } else {
            res.status(200).json({ cards })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
};




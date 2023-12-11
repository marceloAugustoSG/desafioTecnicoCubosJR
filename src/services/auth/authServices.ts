import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { prismaClient } from '../../PrismaClient';

export function gerarToken(personId) {
    const payload = {
        id: personId
    };
    const secret = process.env.SECRET;

    const token = jwt.sign(payload, secret, { expiresIn: '10m' });
    return token;
}
export function authenticate(req: Request, res: Response, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);
        console.log(decoded);

        // Adicione next() para permitir que o fluxo continue para as rotas subsequentes
        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Token inválido" });
    }
}
export const logar = async (req: Request, res: Response) => {
    console.log(req.body);

    try {
        const { document, password } = req.body;

        if (!document || !password) {
            return res.status(400).json({ message: "Documento e senha são obrigatórios" });
        }

        const usuario = await prismaClient.people.findUnique({
            where: {
                document
            },
            select: {
                id: true,
                name: true,
                document: true,
                password: true

            }
        });

        if (usuario.password != password) {
            return res.status(404).json({ message: "Documento ou senha são inválidos" });
        }
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
        const token = gerarToken(usuario.id);
        const tokenResposta = `Bearer ${token}`
        return res.status(200).json({ token: tokenResposta });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

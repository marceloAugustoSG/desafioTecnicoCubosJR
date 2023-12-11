import { create, list, createCardAccount, listCards, createTransactionAccount, listTransactions } from "../controllers/Account.controller"

const accountRoutes = (app) => {

    //Criação de uma conta
    app.post('/:id/accounts', create)

    //Criação de uma cartão em uma conta
    app.post('/accounts/:id/cards', createCardAccount)

    //Criação de uma transação em uma conta
    app.post('/accounts/:id/transaction', createTransactionAccount)

    //Listagem de contas
    app.get('/accounts', list)

    //Listagem de cartões de uma conta
    app.get('/accounts/:id/cards', listCards)

    //Listagem de transações de uma conta
    app.get('/accounts/:accountId/transactions', listTransactions)
}
export default accountRoutes
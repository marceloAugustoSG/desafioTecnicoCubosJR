import { create, createCardAccount, createTransactionAccount, listTransactions, listTransactionsWithFilters, getBalance, listAccountCards } from "../controllers/Account.controller"
import { authenticate } from "../services/auth/authServices"

const accountRoutes = (app) => {

    //Criação de uma conta
    app.post('/:id/accounts', authenticate, create)

    //Criação de uma cartão em uma conta
    app.post('/accounts/:id/cards', authenticate, createCardAccount)


    //Criação de uma transação em uma conta
    app.post('/accounts/:id/transaction', authenticate, createTransactionAccount)

    //Listagem de transacoes com filtro
    app.get('/accounts/:accountId/transactions', authenticate, listTransactionsWithFilters)

    app.get('/accounts/:accountId/cards', authenticate, listAccountCards)

    // Ver saldo da conta
    app.get('/accounts/:accountId/balance', authenticate, getBalance)
}
export default accountRoutes
import { create, listAccounts, listCards } from "../controllers/People.controller"
import { logar } from "../services/auth/authServices"
import { authenticate } from "../services/auth/authServices"

const peopleRoutes = (app) => {

    //Criação de pessoa
    app.post('/people', create)

    //Listagem de todas as contas de uma pessoa
    app.get('/:id/accounts', listAccounts)

    //Listagem de todos os cards de uma pessoa
    app.get('/:id/accounts/cards', authenticate, listCards)

    //Login
    app.post('/login/', logar)
}
export default peopleRoutes
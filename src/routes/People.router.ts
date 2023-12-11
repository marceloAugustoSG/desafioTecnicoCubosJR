import { create, list, listAccounts, listCards } from "../controllers/People.controller"

const peopleRoutes = (app) => {
    app.post('/people', create)
    app.get('/persons', list)
    app.get('/:id/accounts', listAccounts)
    app.get('/:id/accounts/cards', listCards)
}
export default peopleRoutes
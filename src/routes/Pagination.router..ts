import { listPeoplesPagination, listAccountPagination, listCardPagination, listTransactionPagination } from "../pagination";

const paginationRoutes = (app) => {

    app.get('/peoples', listPeoplesPagination)
    app.get('/account', listAccountPagination)
    app.get('/cards', listCardPagination)
    app.get('/transactions', listTransactionPagination)

}
export default paginationRoutes
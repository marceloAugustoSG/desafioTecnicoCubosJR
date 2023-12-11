import peopleRoutes from "./People.router"
import accountRoutes from "./Account.router"
import paginationRoutes from "./Pagination.router."
const routes = (app) => {

    peopleRoutes(app)
    accountRoutes(app)
    paginationRoutes(app)
}

export default routes;
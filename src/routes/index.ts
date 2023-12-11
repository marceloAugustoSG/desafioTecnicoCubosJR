import peopleRoutes from "./People.router"
import accountRoutes from "./Account.router"
const routes = (app) => {

    peopleRoutes(app)
    accountRoutes(app)
}

export default routes;
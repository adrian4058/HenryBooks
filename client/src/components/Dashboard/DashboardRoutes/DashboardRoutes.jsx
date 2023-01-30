import { Route } from "react-router-dom"
import Dashboard from "../Dashboard";
import DashboardBooks from "../DashboardComponents/DashboardBooks/DashboardBooks";

const DashboardRoutes = () => {
  return (
    <div>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard-books" component={DashboardBooks} />
    </div>
  )
}

export default DashboardRoutes;
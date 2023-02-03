import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Team from "./components/Team/Team";
import DashboardRoutes from "./components/Dashboard/DashboardRoutes/DashboardRoutes";
import DashboardBooks from "./components/Dashboard/DashboardComponents/DashboardBooks/DashboardBooks";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import userProfile from "./components/userProfile/userProfile";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DefaultPage from "./components/DefaultPage/DefaultPage";
import { RegisterDos } from "./components/Register2/RegisterDos";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/dashboard" component={DashboardRoutes} />
          <Route exact path="/dashboard-books" component={DashboardBooks} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/books/:id" component={Details} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route exact path="/profile" component={userProfile} />
          <Route exact path="/registerdos" component={RegisterDos} />
          <Route component={DefaultPage} />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

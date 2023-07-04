import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Team from "./components/Team/Team";
import DashboardRoutes from "./components/Dashboard/DashboardRoutes/DashboardRoutes";
import DashboardBooks from "./components/Dashboard/DashboardComponents/DashboardBooks/DashboardBooks";
import DashboardUsers from "./components/Dashboard/DashboardComponents/DashboardUsers/DashboardUsers";
import Login from "./components/Login/Login";
import { putToken, llenarUsuario, setCart } from "./actions";
import userProfile from "./components/userProfile/userProfile";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DefaultPage from "./components/DefaultPage/DefaultPage";
import { RegisterDos } from "./components/Register2/RegisterDos";

import FAQ from "./components/FAQ/FAQ";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
    if (localStorage.getItem("usuario")) {
      let user = JSON.parse(localStorage.getItem("usuario"));
      let token = localStorage.getItem("token");
      console.log(user);
      if (user) {
        dispatch(putToken(token));
        dispatch(llenarUsuario(user));
      }
    }
  }, [dispatch]);

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
          <Route exact path="/dashboard-users" component={DashboardUsers} />
          <Route exact path="/login" component={Login} />
          <Route path="/books/:id" component={Details} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/profile" component={userProfile} />
          <Route exact path="/registerdos" component={RegisterDos} />
          <Route exact path="/preguntas" component={FAQ} />
          <Route component={DefaultPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

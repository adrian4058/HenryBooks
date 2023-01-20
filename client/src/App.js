import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Details from "./components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route>
            <NavBar />
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about-us">
              <About />
            </Route>
            <Route path="/books/:id">
              <Details />
            </Route>
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

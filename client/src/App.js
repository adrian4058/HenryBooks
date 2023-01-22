import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/books/:id" component={Details} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

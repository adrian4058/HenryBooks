import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import About from './components/About/About'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/about-us">
            <About />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

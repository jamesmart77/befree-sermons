import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Sermons from "./pages/Sermons";
import Admin from "./pages/Admin";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer";
import history from './utils/history';
import API from './utils/API';


const App = () =>
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Sermons} />
        <Route exact path="/admin" render={() => {
          //authenticate
          API.validateUser();
          return <Admin/>
        } } />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;
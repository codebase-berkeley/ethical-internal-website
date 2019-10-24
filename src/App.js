import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Announcements} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/announcements" component={Announcements} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

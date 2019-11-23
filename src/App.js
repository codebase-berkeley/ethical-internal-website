import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Switch>
          <Route component={Inventory} path="/inventory" />
          <Route component={Orders} path="/orders" />
          <Route component={Announcements} path="/announcements" />
          <Route component={Login} path="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;

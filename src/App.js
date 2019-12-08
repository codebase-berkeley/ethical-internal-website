import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/announcements">
            <Route component={NavigationBar} path="/" />
            <Route component={Announcements} path="/" />
          </Route>
          <Route path="/inventory">
            <Route component={NavigationBar} path="/" />
            <Route component={Inventory} path="/" />
          </Route>
          <Route path="/orders">
            <Route component={NavigationBar} path="/" />
            <Route component={Orders} path="/" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

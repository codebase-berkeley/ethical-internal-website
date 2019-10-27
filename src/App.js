import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import NavigationBar from "./components/NavigationBar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route component={Announcements} path="/announcements" />
        <Route component={Inventory} path="/inventory" />
        <Route component={Orders} path="/orders" />
      </Switch>
    </div>
  );
}

export default App;

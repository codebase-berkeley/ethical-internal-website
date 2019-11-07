import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route component={Inventory} path="/inventory" />
        <Route component={Orders} path="/orders" />
        <Route component={Announcements} path="/" />
      </Switch>
    </div>
  );
}

export default App;

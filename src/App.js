import React from "react";
import "./App.css";
import Announcements from "./components/Announcements";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Announcements />
      <Inventory />
      <Orders />
    </div>
  );
}

export default App;

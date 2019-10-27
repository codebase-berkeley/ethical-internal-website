import React from "react";
import "./NavigationBar.css";
import { Route, Switch, Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="Nav-bar">
        <ul>
          <li>
            <Link to="/announcements" style={{ textDecoration: "none" }}>
              Announcements
            </Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li className="left">
            <Link to="/">Ethical</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/announcements">
            <Announcements />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

function Announcements() {
  return <h2>Announcements</h2>;
}

function Orders() {
  return <h2>Orders</h2>;
}

function Inventory() {
  return <h2>Inventory</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

export default NavigationBar;

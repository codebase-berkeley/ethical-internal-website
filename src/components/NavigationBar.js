import React from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="Nav-bar">
        <ul>
          <li>
            <Link to="announcements">Announcements</Link>
          </li>
          <li>
            <Link to="inventory">Inventory</Link>
          </li>
          <li>
            <Link to="orders">Orders</Link>
          </li>
          <div className="left">
            <li>
              <Link to="/">Ethical</Link>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;

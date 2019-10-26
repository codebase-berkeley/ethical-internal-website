import React from "react";
import "./NavigationBar.css";

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="Nav-bar">
        <ul>
          <li>Announcements</li>
          <li>Inventory</li>
          <li>Orders</li>
          <li className="left">Ethical</li>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;

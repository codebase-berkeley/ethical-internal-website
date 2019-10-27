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
          <div className="left">
            <li>Ethical</li>
          </div>
        </ul>
      </div>
    );
  }
}

export default NavigationBar;

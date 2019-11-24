import React from "react";
import Post from "./Post";
const { token } = require("./Login");

class Announcements extends React.Component {
  constructor() {
    super();
    this.state = { postValues: [] };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3001/announcements");
    const json = await response.json();
    this.setState({ postValues: json });
  }

  render() {
    return (
      <div className="Announcements-section">
        {this.state.postValues.map(item => (
          <Post key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

export default Announcements;

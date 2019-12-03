import React from "react";
import Post from "./Post";
import "./DataTable.css";
const localStorage = require("local-storage");

class Announcements extends React.Component {
  constructor() {
    super();
    this.state = { postValues: [] };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3001/announcements", {
      headers: { authorization: localStorage.get("token") }
    });
    if (response.status === 401) {
      let path = "/login";
      this.props.history.push(path);
    }
    const json = await response.json();
    this.setState({ postValues: json });
  }

  render() {
    return (
      <div className="header">
        <h1 className="Announcements-section">ANNOUNCEMENTS </h1>
        {this.state.postValues.map(item => (
          <Post key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

export default Announcements;

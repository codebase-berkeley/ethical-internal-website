import React from "react";
import Post from "./Post";
import "./Announcements.css";
import styled from "styled-components";

const localStorage = require("local-storage");
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? "#8dc34d" : "white")};
  color: ${props => (props.primary ? "white" : "#8dc34d")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8dc34d;
  border-radius: 4px;
`;

class Announcements extends React.Component {
  constructor() {
    super();
    this.state = {postValues: [], creating: false, title: "", info: ""};
  }

  titleInput = event => {
    this.setState({title: event.target.value});
  };

  infoInput = event => {
    this.setState({info: event.target.value});
  };

  async componentDidMount() {
    const response = await fetch("https://ethical-backend.herokuapp.com/announcements", {
      headers: {authorization: localStorage.get("token")}
    });
    if (response.status === 401) {
      let path = "/login";
      this.props.history.push(path);
    }
    const json = await response.json();
    this.setState({postValues: json});
  }

  async buttonClick() {
    const response = await fetch("https://ethical-backend.herokuapp.com/announcements", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        authorization: localStorage.get("token")
      },
      body: JSON.stringify({
        title: this.state.title,
        info: this.state.info
      })
    });
    const json = await response.json();
    this.setState({
      creating: false,
      postValues: [
        {
          id: json.id,
          user_id: null,
          title: this.state.title,
          info: this.state.info,
          time: null
        }
      ].concat(this.state.postValues)
    });
  }

  render() {
    return (
      <div className="header">
        <h1 className="Announcements-section">ANNOUNCEMENTS </h1>
        <div className="dropdown-button">
          <Button
            primary
            onClick={() =>
              this.setState({
                creating: true
              })
            }>
            Make new announcement
          </Button>
        </div>
        <div>
          {this.state.creating && (
            <div className="input">
              <form>
                <textarea
                  className="title"
                  resize="vertical"
                  type="text"
                  placeholder="Announcement title"
                  onChange={this.titleInput}
                />
                <br />
                <textarea
                  className="textArea"
                  resize="vertical"
                  type="text"
                  placeholder="Type your announcement here..."
                  onChange={this.infoInput}
                />
              </form>
              <Button
                primary
                onClick={() => this.buttonClick()}
                id="button"
                type="submit">
                Post
              </Button>
            </div>
          )}
        </div>
        <div className="posts">
          {this.state.postValues.map(item => (
            <Post key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Announcements;

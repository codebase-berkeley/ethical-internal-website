import React from "react";
import "./Post.css";

class Post extends React.Component {
  render() {
    return (
      <div className="Post-box">
        <h1 className="Post-title">{this.props.title}</h1>
        <div className="Post-name-date">
          <p className="Post-name">{this.props.name}</p>
          <p className="Post-date">{this.props.date}</p>
        </div>
        <p className="Post-content">{this.props.content}</p>
      </div>
    );
  }
}
export default Post;

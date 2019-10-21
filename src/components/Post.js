import React from 'react';
import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <div className = "Post-box" >
      <h1 className = "Post-title">
        {this.props.title}
      </h1>
      <p className = "Post-date">
        {this.props.date}
      </p>
      <p className = "Post-content">
        {this.props.content}
      </p>
    </div>
    );
  }
}
export default Post;
import React from "react";
import Post from "./Post";

const postValues = [
  {
    title: "New Inventory",
    name: "Mike Hunt",
    date: "10/17/19",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    id: 1
  },

  {
    title: "New Application",
    name: "Hugh Jass",
    date: "10/20/19",
    content: "Finding New Members. Application is now open.",
    id: 2
  }
];

class Announcements extends React.Component {
  render() {
    return (
      <div className="Announcements-section">
        {postValues.map(item => (
          <Post key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

export default Announcements;

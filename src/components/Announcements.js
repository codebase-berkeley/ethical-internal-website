import React from 'react';
import Post from './Post'

const postValues = [
  {
    title: 'New Inventory',
    date: '10/17/19',
    content: 'Hello, I am buying things right now'
  },
  {
    title: 'New Application',
    date: '10/20/19',
    content: 'Finding New Members. Application is now open.'
  },
];

class Announcements extends React.Component {
  render() {
    return (
      <div className = 'Announcements-section'>
        {postValues.map((item) => (<Post {...item}/>))}
      </div>
    );
  }
}

export default Announcements;

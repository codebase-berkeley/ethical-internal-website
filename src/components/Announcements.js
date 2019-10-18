import React from 'react';
import Post from './Post'

const postValues = [
  {
    title: 'New Inventory',
    date: '10/17/19',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
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
